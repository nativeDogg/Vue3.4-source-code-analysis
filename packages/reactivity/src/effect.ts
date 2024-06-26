export function effect(fn, options?) {
  // 创建一个响应式effect 只要依赖的属性变化了就要执行回调
  const _effect = new ReactiveEffect(fn, () => {
    _effect.run();
  });
  // 默认开始执行一次
  _effect.run();

  return _effect;
}

export let activeEffect;
class ReactiveEffect {
  // 表示创建的effect是响应式的
  public active = true;
  // fn用户编写的函数
  // 如果fn中依赖的数据发生变化 需要重新调用 run方法 而 run方法实际上调用的是fn
  constructor(public fn, public scheduler) {}

  // 让fn执行
  run() {
    // 不是激活的 执行后 什么都不用做
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
}
