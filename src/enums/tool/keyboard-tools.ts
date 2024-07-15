// keyboard-utils.ts
import { EVENT_CODE } from '../aria';

/**
 * @example
 * import KeyboardTools from './keyboard-utils';
import { EVENT_CODE } from './event-codes';

const input = document.createElement('input');
document.body.appendChild(input);

const keyboardTools = new KeyboardTools(input);

const handleEnter = (event: KeyboardEvent) => {
  console.log('Enter key pressed');
};

const handleEscape = (event: KeyboardEvent) => {
  console.log('Escape key pressed');
};

keyboardTools.addEventListener(EVENT_CODE.enter, handleEnter);
keyboardTools.addEventListener(EVENT_CODE.esc, handleEscape);

// To remove the listeners
keyboardTools.removeEventListener(EVENT_CODE.enter, handleEnter);
keyboardTools.removeEventListener(EVENT_CODE.esc, handleEscape);

 */

// 对某个html元素进行键盘操作的处理程序
export class KeyboardTools {
  constructor(element: HTMLElement) {
    this.element = element;
  }

  private element: HTMLElement;

  // Store original handlers mapped to the wrapped listener functions
  private listeners: Map<
    (event: KeyboardEvent) => void,
    (event: KeyboardEvent) => void
  > = new Map();

  isKey(event: KeyboardEvent, key: string): boolean {
    return event.key === key;
  }

  isEnter(event: KeyboardEvent): boolean {
    return this.isKey(event, EVENT_CODE.enter);
  }

  isEscape(event: KeyboardEvent): boolean {
    return this.isKey(event, EVENT_CODE.esc);
  }

  isSpace(event: KeyboardEvent): boolean {
    return this.isKey(event, EVENT_CODE.space);
  }

  addEventListener(
    eventCode: string,
    handler: (event: KeyboardEvent) => void
  ): void {
    const listener = (event: KeyboardEvent) => {
      if (event.key === eventCode) {
        handler(event);
      }
    };
    this.element.addEventListener('keydown', listener);
    // Store the listener to remove it later if needed
    this.listeners.set(handler, listener);
  }

  removeEventListener(
    eventCode: string,
    handler: (event: KeyboardEvent) => void
  ): void {
    const listener = this.listeners.get(handler);
    if (listener) {
      this.element.removeEventListener('keydown', listener);
      this.listeners.delete(handler);
    }
  }
}
