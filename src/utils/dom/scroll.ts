import { isClient } from '../browser'
import { easeInOutCubic } from '../easings'
import { isWindow } from '../types'
import { cAF, rAF } from '../raf'
import { getStyle } from './style'

/**
 * Check if an element is scrollable.
 * @param el The HTMLElement to check.
 * @param isVertical Optional flag to check vertical scrolling.
 * @returns True if the element is scrollable, false otherwise.
 */
export const isScroll = (el: HTMLElement, isVertical?: boolean): boolean => {
  if (!isClient) return false

  const key = (
    {
      undefined: 'overflow',
      true: 'overflow-y',
      false: 'overflow-x',
    } as const
  )[String(isVertical)]!
  const overflow = getStyle(el, key)
  return ['scroll', 'auto', 'overlay'].some((s) => overflow.includes(s))
}

/**
 * Get the scroll container of an element.
 * @param el The HTMLElement to find the scroll container for.
 * @param isVertical Optional flag to find vertical scroll container.
 * @returns The scroll container (Window or HTMLElement), or undefined if not found.
 */
export const getScrollContainer = (
  el: HTMLElement,
  isVertical?: boolean
): Window | HTMLElement | undefined => {
  if (!isClient) return

  let parent: HTMLElement = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent))
      return window

    if (isScroll(parent, isVertical)) return parent

    parent = parent.parentNode as HTMLElement
  }

  return parent
}

let scrollBarWidth: number

/**
 * Get the width of the scrollbar.
 * @param namespace The namespace for the scrollbar.
 * @returns The width of the scrollbar.
 */
export const getScrollBarWidth = (namespace: string): number => {
  if (!isClient) return 0
  if (scrollBarWidth !== undefined) return scrollBarWidth

  const outer = document.createElement('div')
  outer.className = `${namespace}-scrollbar__wrap`
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  outer.parentNode?.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWithScroll

  return scrollBarWidth
}

/**
 * Scroll an element into view within its container.
 * @param container The container element.
 * @param selected The element to scroll into view.
 */
export function scrollIntoView(
  container: HTMLElement,
  selected: HTMLElement
): void {
  if (!isClient) return

  if (!selected) {
    container.scrollTop = 0
    return
  }

  const offsetParents: HTMLElement[] = []
  let pointer = selected.offsetParent
  while (
    pointer !== null &&
    container !== pointer &&
    container.contains(pointer)
  ) {
    offsetParents.push(pointer as HTMLElement)
    pointer = (pointer as HTMLElement).offsetParent
  }
  const top =
    selected.offsetTop +
    offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0)
  const bottom = top + selected.offsetHeight
  const viewRectTop = container.scrollTop
  const viewRectBottom = viewRectTop + container.clientHeight

  if (top < viewRectTop) {
    container.scrollTop = top
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight
  }
}

/**
 * Animate scrolling to a specific position within a container.
 * @param container The container element or Window.
 * @param from The starting scroll position.
 * @param to The target scroll position.
 * @param duration The duration of the scroll animation.
 * @param callback Optional callback function to call after animation completes.
 */
export function animateScrollTo(
  container: HTMLElement | Window,
  from: number,
  to: number,
  duration: number,
  callback?: unknown
) {
  const startTime = Date.now()

  let handle: number | undefined
  const scroll = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScrollTop = easeInOutCubic(
      time > duration ? duration : time,
      from,
      to,
      duration
    )

    if (isWindow(container)) {
      container.scrollTo(window.pageXOffset, nextScrollTop)
    } else {
      container.scrollTop = nextScrollTop
    }
    if (time < duration) {
      handle = rAF(scroll)
    } else if (typeof callback === 'function') {
      callback()
    }
  }

  scroll()

  return () => {
    handle && cAF(handle)
  }
}

/**
 * Get the scroll element within a container.
 * @param target The target HTMLElement.
 * @param container The container element or Window.
 * @returns The scroll element.
 */
export const getScrollElement = (
  target: HTMLElement,
  container: HTMLElement | Window
) => {
  if (isWindow(container)) {
    return target.ownerDocument.documentElement
  }
  return container
}

/**
 * Get the scroll top position of a container.
 * @param container The container element or Window.
 * @returns The scroll top position.
 */
export const getScrollTop = (container: HTMLElement | Window) => {
  if (isWindow(container)) {
    return window.scrollY
  }
  return container.scrollTop
}
