import { isObject } from "@vue/shared";
import { ReactiveFlags, mutableHandlers } from "./baseHandler";

export function reactive(target) {
  return createReactiveObject(target);
}

// 缓存代理对象 可以判断是否已经代理过
let reactiveMap = new WeakMap();

function createReactiveObject(target) {
  if (!isObject(target)) return target;

  // 如果是reactive(reactive(obj))这样子代理两次的结果 需要用到标识符号
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target;
  }

  // 如果存在代理后的结果 直接返回代理结果
  const existProxy = reactiveMap.get(target);
  if (existProxy) return existProxy;

  const proxy = new Proxy(target, mutableHandlers);
  // 设置代理后的结果进入缓存中
  reactiveMap.set(target, proxy);
  return proxy;
}
