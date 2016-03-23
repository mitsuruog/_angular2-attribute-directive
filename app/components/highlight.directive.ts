import {Directive, ElementRef, Input, HostListener} from 'angular2/core';

@Directive({
  selector: '[my-highlight]',
  // [MEMO] @HostListenerで代用可能だったため置き換えた
  // `host`はdirectiveがある要素のことを指す
  // host: {
  //   '(mouseenter)': 'handleMouseEnter()',
  //   '(mouseleave)': 'handleMouseLeave()'
  // }
})
export class HighlightDirective {
  
  private _defaultColor: string = 'red';
  
  @Input('my-highlight') highlightColor: string;
  
  // [MEMO] `defaultColor`を`this.defaultColor`に設定すると無限ループするので注意w
  @Input() set defaultColor(color: string) {
    this._defaultColor = color || this._defaultColor;
  }
  
  // `ElementRef`はDirectiveにDOMの参照を渡す
  constructor(
    private el: ElementRef
  ) { }
  
  @HostListener('mouseenter')
  handleMouseEnter() {
    this.highlight(this.highlightColor || this._defaultColor);
  }
  
  @HostListener('mouseleave')
  handleMouseLeave() {
    this.highlight(null);
  }
  
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}