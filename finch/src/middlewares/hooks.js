import async_hooks from 'async_hooks';
import fs from 'fs';
import util from 'util';
import { nanoid } from 'nanoid';

const store = new Map();


function  init(asyncId, type, triggerAsyncId) {

    if (store.has(triggerAsyncId)) {
      store.set(asyncId, store.get(triggerAsyncId));
    }
    // debug(store);
  }

function  destroy(asyncId) {
    if (store.has(asyncId)) {
      store.delete(asyncId);
    }
  }

const hook = async_hooks.createHook({ init, destroy });

hook.enable();


function debug(...args) {
  fs.writeFileSync(1, `${util.format(...args)}\n`, { flag: 'a' });
}

export function createRequestContext(id) {
  // console.log(hook.enable());
  store.set(async_hooks.executionAsyncId(), {request_id: nanoid(), id });
}

export function getRequestContext() {
  return store.get(async_hooks.executionAsyncId());
}
