// 在这个文件中，定义了常用键盘事件的代码和辅助函数，这些代码和辅助函数可以用于处理用户输入、导航和交互，尤其是在无障碍（accessibility）方面

// 键盘事件代码
export const EVENT_CODE = {
  tab: 'Tab',
  enter: 'Enter',
  space: 'Space',
  left: 'ArrowLeft',
  up: 'ArrowUp',
  right: 'ArrowRight',
  down: 'ArrowDown',
  esc: 'Escape',
  delete: 'Delete',
  backspace: 'Backspace',
  numpadEnter: 'NumpadEnter',
  pageUp: 'PageUp',
  pageDown: 'PageDown',
  home: 'Home',
  end: 'End',
  f1: 'F1',
  f2: 'F2',
  f3: 'F3',
  f4: 'F4',
  f5: 'F5',
  f6: 'F6',
  f7: 'F7',
  f8: 'F8',
  f9: 'F9',
  f10: 'F10',
  f11: 'F11',
  f12: 'F12',
  insert: 'Insert',
  contextMenu: 'ContextMenu',
};

// 文件名 aria.ts 来源于 ARIA (Accessible Rich Internet Applications) 的缩写。
// ARIA 是一套专门为提升 web 应用可访问性而设计的技术规范。
// 它定义了一系列的属性，可以用来增强 web 内容和应用的可访问性，特别是针对残障用户。
// ---------------------------------------------------------------------------------------------------------
// 理解 ARIA（Accessible Rich Internet Applications）属性和角色如何帮助残障用户（例如使用屏幕阅读器的用户）是关键。
// ARIA 通过提供额外的语义信息，使得这些用户可以更好地理解和操作网页内容。
// 以下是一些详细的解释和示例，展示 ARIA 如何帮助残障用户，以及如何使用 AriaAttributes 类来实现这些功能。
// ---------------------------------------------------------------------------------------------------------
// 1.ARIA 的作用
// ---------------------------------------------------------------------------------------------------------
// ARIA 属性和角色通过向 HTML 元素添加额外的语义信息，使得屏幕阅读器等辅助技术能够更好地解释和操作网页内容。例如：
// 角色（Roles）：定义了元素的目的。例如，一个按钮的角色是 button，这告诉屏幕阅读器这个元素是可点击的。
// 属性（Attributes）：提供了元素的状态信息。例如，aria-expanded 告诉用户一个可折叠的部分是展开还是折叠的。

// 2.代码示例
// ---------------------------------------------------------------------------------------------------------
// import AriaAttributes, { ARIA_ROLE, ARIA_ATTRIBUTE } from './aria-attributes';

// const button = document.createElement('button');
// const menu = document.createElement('div');

// document.body.appendChild(button);
// document.body.appendChild(menu);

// const buttonAria = new AriaAttributes(button);
// const menuAria = new AriaAttributes(menu);

// // 初始化 ARIA 属性和角色
// buttonAria.setRole(ARIA_ROLE.button);
// button.textContent = 'Toggle Menu';
// menuAria.setAttribute(ARIA_ATTRIBUTE.hidden, 'true');
// menuAria.setAttribute(ARIA_ATTRIBUTE.role, ARIA_ROLE.menuItem);

// // 添加按钮点击事件，切换菜单的展开状态
// button.addEventListener('click', () => {
//   const isExpanded = menu.getAttribute(ARIA_ATTRIBUTE.hidden) === 'false';
//   buttonAria.setAttribute(ARIA_ATTRIBUTE.expanded, !isExpanded);
//   menuAria.setAttribute(ARIA_ATTRIBUTE.hidden, isExpanded ? 'true' : 'false');
// });
