// 文件用途：验证鼠标增强的异步加载竞争、降级、空闲暂停与监听器清理。
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
/** Model only browser event boundaries; upstream visual behavior is checked in the real browser. */
function target(extra={}) { const listeners=new Map();return {...extra,addEventListener(k,f){if(!listeners.has(k))listeners.set(k,new Set());listeners.get(k).add(f);},removeEventListener(k,f){listeners.get(k)?.delete(f);},async fire(k,e={}){await Promise.all([...listeners.get(k)||[]].map(f=>f(e)));},count(k){return listeners.get(k)?.size||0;}}; }
const reduced=target({matches:false}),fine=target({matches:true}),classes=new Set(),ticks=new Set(),timers=new Map();
const root=target({classList:{add:k=>classes.add(k),remove:k=>classes.delete(k),toggle(k,v){v?classes.add(k):classes.delete(k);}}});
const doc=target({hidden:false,documentElement:root});const win=target();let serial=0,created=0,destroyed=0,loaded=0,last;
const gsap={ticker:{add:f=>ticks.add(f),remove:f=>ticks.delete(f)},killTweensOf(){}};
/** Emulate the vendor lifecycle contract without duplicating its easing implementation. */
class Follower {constructor(options){this.options=options;this.pos={};this.el={setAttribute(){}};this.ticker=()=>{};this.states=new Set();created++;last=this;ticks.add(this.ticker);}render(force){assert.equal(force,true);}destroy(){ticks.delete(this.ticker);destroyed++;}show(){}hide(){}removeState(){this.states.clear();}addState(s){this.states.add(s);}removeStick(){this.stick=null;}setStick(t){this.stick=t;}}
let loader=async()=>{loaded++;return {Follower,gsap};};
const sandbox={window:win,document:doc,matchMedia:q=>q.includes('reduced')?reduced:fine,setTimeout(f){timers.set(++serial,f);return serial;},clearTimeout(id){timers.delete(id);},load:()=>loader()};
const code=(await readFile('src/motion.js','utf8')).replace('export function','function');vm.runInNewContext(code+'\nthis.dispose=initPointerMotion({load});',sandbox);
const element={closest:()=>null};const mouse={pointerType:'mouse',clientX:120,clientY:80,target:element};
assert.equal(loaded,0,'No scripts loaded before mouse use');await win.fire('pointermove',{...mouse,pointerType:'touch'});assert.equal(loaded,0);
await win.fire('pointermove',mouse);assert.equal(created,1);assert.ok(classes.has('cursor-ready'));assert.equal(ticks.size,1);
for(const f of timers.values())f();timers.clear();assert.equal(ticks.size,0,'Idle releases the render ticker');
await win.fire('pointermove',mouse);assert.equal(created,1);assert.equal(ticks.size,1);
const button={matches:()=>true};await win.fire('pointermove',{...mouse,target:{closest:s=>s.startsWith('a,')?button:null}});assert.equal(last.stick,button);assert.ok(last.states.has('-magnetic'));
reduced.matches=true;await reduced.fire('change');assert.equal(ticks.size,0);assert.ok(!classes.has('cursor-ready'));assert.equal(destroyed,1);
await win.fire('pointermove',mouse);assert.equal(created,1);
reduced.matches=false;let resolveLoad;loader=()=>new Promise(r=>{resolveLoad=r;});const movement=win.fire('pointermove',mouse);doc.hidden=true;await doc.fire('visibilitychange');resolveLoad({Follower,gsap});await movement;assert.equal(created,1,'Late load cannot revive hidden-page cursor');
doc.hidden=false;loader=async()=>({Follower,gsap});await win.fire('pointermove',mouse);assert.equal(created,2);
await win.fire('pointerdown',{pointerType:'touch'});assert.ok(!classes.has('cursor-ready'));assert.equal(ticks.size,0);
loader=async()=>{throw new Error('offline');};await win.fire('pointermove',mouse);assert.ok(!classes.has('cursor-ready'),'Load failure retains native pointer');
sandbox.dispose();assert.equal(win.count('pointermove'),0);assert.equal(doc.count('visibilitychange'),0);assert.equal(ticks.size,0);
console.log('motion tests passed: lazy load, magnetic states, idle sleep, touch, reduced motion, async race, load failure and disposal');
