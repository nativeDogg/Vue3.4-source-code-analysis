// 为什么能使用@vue/shared ？ 原因是在tsconfig.json中配置了paths和baseUrl
// 同时在@vue/reactivity模块中安装@vue/shared依赖
// 使用命令: pnpm i @vue/shared --workspace --filter @vue/reactivity
import { isObject } from "@vue/shared";

console.log(isObject({ a: 1 }));
