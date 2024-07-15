import { isClient } from './browser';

export const rAF = (fn: () => void) =>
  isClient
    ? window.requestAnimationFrame(fn)
    : (setTimeout(fn, 16) as unknown as number);
// ### 函数解析：`rAF`

// 此 TypeScript 函数 `rAF` 的主要功能是根据运行环境选择性地调用 `requestAnimationFrame` 或 `setTimeout` 来延迟执行传入的函数 `fn`。

// #### 参数说明

// - `fn`: 类型为 `() => void` 的函数，即一个无参数且返回值类型为 `void` 的函数。

// #### 主体逻辑

// 1. **条件判断**:
//    - 首先检查变量 `isClient` 的值。
//      - 如果 `isClient` 为真（通常意味着代码正在浏览器环境下运行），则使用 `window.requestAnimationFrame` 调用 `fn`。
//      - 如果 `isClient` 为假（意味着代码可能在非浏览器环境如 Node.js 中运行），则使用 `setTimeout` 调用 `fn` 并设置延时时间为 16 毫秒，这与 `requestAnimationFrame` 的平均帧率（约 60fps）相对应。

// 2. **处理结果**:
//    - 当使用 `requestAnimationFrame` 调用 `fn` 时，直接返回 `requestAnimationFrame` 的返回值，这是一个 `number` 类型的请求 ID。
//    - 当使用 `setTimeout` 调用 `fn` 时，由于 `setTimeout` 返回的是 `number` 类型，但为了与 `requestAnimationFrame` 的返回类型保持一致，通过 `(as unknown as number)` 进行类型转换。

// #### 总结

// - `rAF` 函数提供了一个跨环境的解决方案，使得开发者可以在浏览器中利用 `requestAnimationFrame` 的性能优势，在非浏览器环境中也能通过 `setTimeout` 达到类似的效果，确保了代码的兼容性和性能优化。
export const cAF = (handle: number) =>
  isClient ? window.cancelAnimationFrame(handle) : clearTimeout(handle);

// 此 TypeScript 函数 `cAF` 的主要目的是在不同的运行环境中取消动画帧或清除定时器。它通过判断当前环境是否为客户端（浏览器环境）来决定调用哪个方法。

// #### 参数说明
// - **handle**: 类型为 `number`，表示一个动画帧或定时器的标识符。这个标识符通常是由 `requestAnimationFrame` 或 `setTimeout` 方法返回的，用于后续取消操作。

// #### 返回值
// - 无返回值。

// #### 功能细节
// 1. **环境检测**:
//    - 使用 `isClient` 来判断当前代码是否运行在客户端（浏览器）环境。
   
// 2. **动画帧取消**:
//    - 如果 `isClient` 为真，即代码运行在浏览器环境下，则调用 `window.cancelAnimationFrame(handle)` 来取消与 `handle` 对应的动画帧请求。
   
// 3. **定时器清除**:
//    - 如果 `isClient` 为假，即代码不在浏览器环境下运行（例如在 Node.js 环境中），则调用 `clearTimeout(handle)` 来清除与 `handle` 对应的定时器。

// #### 总结
// `cAF` 函数提供了一种跨环境的方式来取消动画帧或定时器，使得代码可以更灵活地在不同环境中运行而无需修改。
