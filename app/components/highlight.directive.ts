import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
  selector: '[my-highlight]',
  // `host`はdirectiveがある要素のことを指す
  host: {
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()'
  }
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
  
  handleMouseEnter() {
    this.highlight(this.highlightColor || this._defaultColor);
  }
  
  handleMouseLeave() {
    this.highlight(null);
  }
  
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}