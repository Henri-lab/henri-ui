import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx';//允许在 Vue 组件中使用 JSX 语法



export default defineConfig({
    build: {
        lib: {
            entry: 'src/main.ts', // UI 库的入口文件路径
            name: 'henriUI', // 全局变量的名称，如果需要通过 <script> 标签引入
        },
        rollupOptions: {
            // 减小库的体积：不将 Vue 打包进库文件中可以显著减小库的大小，因为用户在项目中可能已经使用了相同版本的 Vue。
            // 避免版本冲突：如果每个库都将自己的 Vue 打包进去，可能会导致项目中出现多个不同版本的 Vue，从而引发版本冲突和不必要的复杂性。
            // 提高库的灵活性：将 Vue 作为外部依赖使得你的库更加灵活，可以与用户项目中的任何 Vue 版本兼容，而不受限于特定的版本
            external: ['vue'], // 将 Vue 
            // globals 配置通常是与 external 配置结合使用的
            output: {
                globals: {
                    // 在打包库时，Rollup 或 Vite 默认会将所有模块打包成一个单独的文件。但是，如果你的库依赖于全局的 Vue 变量，那么在库被使用的环境中，需要确保能正确地访问到这个全局变量，而不是尝试去打包 Vue 到你的库中。
                    // 因此，通过配置 globals: { vue: 'Vue' }，相当于告诉打包工具在打包时，遇到对 vue 的引用时，将其视为全局变量 'Vue'。这样做的好处包括：
                    // 避免重复打包: 不需要将 Vue 打包进你的库中，而是依赖于用户项目中已存在的全局 Vue 实例。
                    // 减小库文件体积: 如果 Vue 是作为外部依赖引入的，你的库文件就不会包含 Vue 的代码，从而减小了库的体积。
                    vue: 'Vue', // 将 Vue 的全局变量映射为 'Vue'
                },
            },
        },
    },
    plugins: [
        vue(),
        vueJSX(),
    ]
});

