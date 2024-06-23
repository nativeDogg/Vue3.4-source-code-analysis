// 此文件帮助我们打包packages下的模块 最终打包出js文件
// node dev.js (要打包的名字 -f 打包的格式) == args.slice(2)
import minimist from "minimist";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import esbuild from "esbuild";
// node中的命令行参数通过process 来获取process.argv
const args = minimist(process.argv.slice(2));
const target = args._[0] || "reactivity";
const format = args.f || "iife";
// 获取文件的路径
const __filename = fileURLToPath(import.meta.url);
// 获取文件的文件夹路径 在node中esm模块没有 __dirname 需要用这种方法获取
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);

// 入口文件
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);
const pkg = require(`../packages/${target}/package.json`);
esbuild
  .context({
    // 入口
    entryPoints: [entry],
    // 出口
    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),
    // 当一个模块依赖另一个模块的时候 会把另一个模块也打包进去
    bundle: true,
    // 打包后给浏览器使用
    platform: "browser",
    sourcemap: true,
    format,
    globalName: pkg.buildOptions?.name,
  })
  .then((ctx) => {
    console.log("start dev");
    // 监控入口文件持续进行打包处理
    return ctx.watch();
  });
