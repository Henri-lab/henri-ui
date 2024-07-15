// 设置aria的attributes
export class AriaAttributesTools {

  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  setAttribute(attribute: string, value: string | boolean): void {
    this.element.setAttribute(attribute, value.toString());
  }

  removeAttribute(attribute: string): void {
    this.element.removeAttribute(attribute);
  }

  setRole(role: string): void {
    this.setAttribute('role', role);
  }

  removeRole(): void {
    this.removeAttribute('role');
  }
}
