import { isClient, isIOS } from '@vueuse/core';

export const isFirefox = (): boolean =>
  isClient && /firefox/i.test(window.navigator.userAgent);

export { isClient, isIOS };
// 一些常见的 @vueuse/core 钩子和功能包括：
// useLocalStorage: 在 Vue 组件中使用 localStorage 进行状态持久化。
// useEventListener: 管理 DOM 事件的订阅和取消订阅。
// useIntersectionObserver: 使用 IntersectionObserver 监听元素的可见性。
// useMouse: 获取鼠标事件信息，如位置和点击状态。
// useTitle: 动态管理页面标题的 Vue Composition API 钩子。
// useForm: 简化表单处理的逻辑，包括验证和提交处理等。
// 通过使用 @vueuse/core，开发者可以更加高效地构建复杂的 Vue.js 应用程序，并且利用 Composition API 的优势进行更好的状态管理和逻辑复用。
// ---------------------------------------------------------------------------------------------------------
// isClient: 是否在客户端环境😈
// -条件加载浏览器端特定代码：在需要操作 DOM 或者使用浏览器 API 的场景下，可以通过 isClient 判断，避免在非浏览器环境下引起错误。
// -服务端渲染 (SSR)：在服务端渲染的框架中，可能需要在特定的生命周期钩子中判断 isClient，以避免在服务端执行不必要的浏览器端代码。
// -跨平台开发：在跨平台开发中，可以使用 isClient 条件判断来区分不同的平台执行环境，以提供适配性的处理逻辑。
// isIOS: 用于判断是否是 iOS 设备😈
// isIOS 通常用于判断当前设备是否是 iOS 设备，具体实现可以通过检查用户代理（User Agent）字符串或其他特征来完成。
// 在前端开发中，特别是需要针对 iOS 设备进行特定逻辑处理时，经常会用到这样的判断条件。
// -UI 兼容性处理：在开发响应式网页或者移动端 Web 应用时，可以根据设备类型选择合适的样式和布局。
// -功能支持判断：某些功能或者 API 在不同操作系统下的支持可能有差异，可以根据设备类型来选择性地加载或者执行相关代码。
// -事件处理：iOS 设备上的某些特定事件行为可能与 Android 或桌面端不同，可以根据设备类型调整事件处理逻辑。