// packages/shared/src/index.ts
function isObject(value) {
  return typeof value === "object" && value !== null;
}

// packages/reactivity/src/effect.ts
function effect(fn, options) {
  const _effect = new ReactiveEffect(fn, () => {
    _effect.run();
  });
  _effect.run();
  return _effect;
}
var activeEffect;
var ReactiveEffect = class {
  // fn用户编写的函数
  // 如果fn中依赖的数据发生变化 需要重新调用 run方法 而 run方法实际上调用的是fn
  constructor(fn, scheduler) {
    this.fn = fn;
    this.scheduler = scheduler;
    // 表示创建的effect是响应式的
    this.active = true;
  }
  // 让fn执行
  run() {
    if (!this.active) {
      return this.fn();
    }
    let lastEffect = activeEffect;
    try {
      activeEffect = this;
      return this.fn();
    } finally {
      activeEffect = lastEffect;
    }
  }
};

// packages/reactivity/src/reactiveEffect.ts
function track(target, key) {
  if (activeEffect) {
    console.log(activeEffect, target, key);
  }
}

// packages/reactivity/src/baseHandler.ts
var mutableHandlers = {
  get(target, key, receiver) {
    if (key === "__v_is_reactive" /* IS_REACTIVE */) {
      return true;
    }
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver);
  }
};

// packages/reactivity/src/reactive.ts
function reactive(target) {
  return createReactiveObject(target);
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
function createReactiveObject(target) {
  if (!isObject(target)) return target;
  if (target["__v_is_reactive" /* IS_REACTIVE */]) {
    return target;
  }
  const existProxy = reactiveMap.get(target);
  if (existProxy) return existProxy;
  const proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}
export {
  activeEffect,
  effect,
  reactive
};
//# sourceMappingURL=reactivity.js.map
