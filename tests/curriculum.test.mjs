import {test} from 'node:test';
import assert from 'node:assert/strict';
import {curriculum} from '../tools/curriculum.mjs';

const collectResults=new Function(`${curriculum.javascript[0].code};return collectResults`)();
const createLatestLoader=new Function(`${curriculum.javascript[1].code};return createLatestLoader`)();
const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b;});return {promise,resolve,reject};};
const response=value=>({ok:true,json:async()=>value});

test('async batch example retains input order, empty results, and sync or async failures',async()=>{
  const slow=deferred();
  const pending=collectResults([()=>slow.promise,()=>Promise.reject('network'),()=>{throw new Error('sync');},()=>undefined]);
  slow.resolve(7);
  assert.deepEqual(await pending,[{ok:true,value:7},{ok:false,error:'network'},{ok:false,error:'Error: sync'},{ok:true,value:undefined}]);
  assert.deepEqual(await collectResults([]),[]);
});

test('latest-only loader ignores stale responses and errors even when transport ignores abort',async()=>{
  const pending=[],signals=[],values=[],errors=[];
  const load=createLatestLoader((url,{signal})=>{const d=deferred();pending.push(d);signals.push(signal);return d.promise;},v=>values.push(v),e=>errors.push(e.message));
  const old=load('/old');const latest=load('/latest');
  assert.equal(signals[0].aborted,true);
  pending[1].resolve(response('latest'));await latest;
  pending[0].resolve(response('stale'));await old;
  assert.deepEqual(values,['latest']);assert.deepEqual(errors,[]);
  const oldFailure=load('/old-failure');const freshFailure=load('/fresh-failure');
  pending[2].reject(new Error('stale error'));pending[3].resolve({ok:false,status:503});
  await Promise.all([oldFailure,freshFailure]);
  assert.deepEqual(errors,['HTTP 503']);
});

test('latest-only loader also protects the asynchronous JSON parsing boundary',async()=>{
  const body=deferred();const values=[],errors=[];
  const load=createLatestLoader(async url=>url==='old'?{ok:true,json:()=>body.promise}:response('new'),v=>values.push(v),e=>errors.push(e));
  const old=load('old');await Promise.resolve();await load('new');
  body.resolve('old');await old;assert.deepEqual(values,['new']);assert.deepEqual(errors,[]);
});
