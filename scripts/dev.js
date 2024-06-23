// 此文件帮助我们打包packages下的模块 最终打包出js文件
// node dev.js (要打包的名字 -f 打包的格式) == args.slice(2)
import minimist from "minimist";
import { resolve dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
// node中的命令行参数通过process 来获取process.argv
const args = minimist(process.argv.slice(2))
const target = args._[0] || 'reactivity'
const format = args.f || 'iife'
// 获取文件的路径
const __filename = fileURLToPath(import.meta.url)
// 获取文件的文件夹路径 在node中esm模块没有 __dirname 需要用这种方法获取
const __dirname = dirname(__filename)

const require = createRequire(import.meta.url)

// 入口文件
const entry = resolve(__dirname,`../packages/${target}/src/index.ts`)