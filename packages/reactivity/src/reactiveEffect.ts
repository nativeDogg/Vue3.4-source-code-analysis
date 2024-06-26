import { activeEffect } from "./effect";

// track函数需要收集的数据结构
// 假设是如下的使用：
// effect(() => {
//     console.log(state.name,state.age);
// })
// effect(() => {
//     console.log(state.name);
// })

// track需要收集的数据结构是这样的 name在两个effect中 age在一个effect中
// { "name": '张三', "age": 18 }: {
//     age: {
//         effect,
//     },
//     name: {
//         effect,effect
//     }
// }

export function track(target, key) {
  // 如果有activeEffect这个属性，说明这个key是在effect中访问的，没有说明不再effect中访问
  if (activeEffect) {
    console.log(activeEffect, target, key);
  }
}
