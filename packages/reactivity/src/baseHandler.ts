import { activeEffect } from "./effect";
import { track } from "./reactiveEffect";

export enum ReactiveFlags {
  IS_REACTIVE = "__v_is_reactive",
}

// proxy需要搭配reflect来使用
export const mutableHandlers: ProxyHandler<any> = {
  get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }
    // 当取值的时候 应该让响应式属性和effect映射起来

    //TODO 依赖收集
    // console.log(activeEffect, key);
    track(target, key);

    // debugger;
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    // 找到属性 让对应的effect重新执行
    // TODO 触发更新
    return Reflect.set(target, key, value, receiver);
  },
};
