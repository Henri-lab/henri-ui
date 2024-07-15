// 这个配置文件会将 src/main.ts 作为入口文件，处理其中的 Vue 组件、TypeScript 代码和各种样式文件（SCSS 和 Less），并将结果打包为 dist/bundle.js 和 dist/my-ui-library.css。最终输出的 CSS 文件将包含 SCSS 和 Less 文件的合并结果，并被 Terser 插件压缩和优化。
import vue from 'rollup-plugin-vue';//它将 .vue 文件转换为可以与 Rollup 兼容的 JavaScript 模块，使得 Vue 组件可以在项目中被打包和使用。
import typescript from '@rollup/plugin-typescript';//它将 .ts 和 .tsx 文件编译为 JavaScript，确保在 Rollup 打包过程中支持 TypeScript 代码。
// import scss from 'rollup-plugin-scss';//它将 .scss 文件编译为 CSS，并将其包含在打包结果中，确保样式可以正确应用于项目中的组件。
// import less from 'rollup-plugin-less'; // 处理 Less 样式文件 (.less 文件)
import postcss from 'rollup-plugin-postcss'; // 处理各种样式文件
import { terser } from 'rollup-plugin-terser';//用于压缩和优化生成的 JavaScript 文件。Terser 是一个用于 ES6+ 的 JavaScript 解析器、mangler 和压缩器，它可以有效地减少代码体积，提高性能。

export default {
    input: 'src/main.ts',
    //es（ES Module）、cjs（CommonJS）、umd（Universal Module Definition）和 iife（Immediately Invoked Function Expression）
    output: [
        {
            file: 'dist/henriUI.js',
            format: 'es',
            sourcemap: true,//存储了打包后的代码与源代码之间的映射关系，使得浏览器或调试器能够将错误或日志消息追溯回原始源代码的位置
            globals: {
                vue: 'Vue', // 将全局的 Vue 变量映射为 'Vue'
            }
        },
        {
            file: 'dist/bundle.cjs.js',
            format: 'cjs' // 使用 CommonJS 格式
            // 这里不需要设置 globals
            // CommonJS 格式通常用于 Node.js 等环境，不需要像 UMD 格式那样在浏览器中将依赖的全局变量映射为具体的值。
        },
        {
            file: 'dist/bundle.umd.js',
            format: 'umd', // 使用 UMD 格式
            name: 'henriUI', // 在浏览器中作为全局变量的名称
            globals: {
                vue: 'Vue', // 将全局的 Vue 变量映射为 'Vue'
            },
        },
    ],
    plugins: [
        vue(),
        typescript(),
        // scss({ output: 'dist/my-ui-library.css' }),
        // less({ output: 'dist/my-ui-library.css' }),
        postcss({
            extract: 'dist/henriStyle.css', // 输出的 CSS 文件
            minimize: true, // 压缩 CSS
            sourceMap: true,//方便调试
            use: [
                ['sass', { includePaths: ['./src/styles'] }], // 处理 SCSS 文件
                ['less', { javascriptEnabled: true }] // 处理 Less 文件
            ]
        }),
        terser({ sourceMap: true })
    ],
    external: ['vue']
    //告诉 Rollup 在打包时不要将 Vue 包含在库的输出文件中，而是期望用户在使用你的库时，已经在项目中安装了 Vue 并通过 <script> 标签或模块导入方式来使用它。
    // 这样配置可以确保你的 UI 库在使用时能够和用户项目中的 Vue 版本协调一致，同时避免不必要的重复打包和增加体积。
};
