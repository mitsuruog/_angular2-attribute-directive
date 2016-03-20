import {
  it,
  describe,
  expect,
  inject,
  injectAsync,
  beforeEach,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, View, provide} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {HighlightDirective} from './highlight.directive';

describe('Test: HighlightDirective', () => {

  let testee;
  let mouseenter;

  beforeEachProviders(() => [
    TestComponentBuilder
  ]);

  beforeEach(() => {
    mouseenter = new MouseEvent('mouseenter', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
  });

  it('初期状態はbackgroundColorに何も設定していないこと', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    let template = '<div my-highlight>highlight me</div>';
    return tcb.overrideTemplate(TestComponent, template)
      .createAsync(TestComponent)
      .then((fixture) => {
        let div = fixture.nativeElement.querySelector('div');

        fixture.detectChanges();
        expect(div).toHaveText('highlight me');
        expect(div.style.backgroundColor).toEqual('');

      });
  }));

  describe('mouseenterした場合のbackgroundColorの確認', () => {

    it('デフォルトはbackgroundColor="red"であること', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      let template = '<div my-highlight>highlight me</div>';
      return tcb.overrideTemplate(TestComponent, template)
        .createAsync(TestComponent)
        .then((fixture) => {
          fixture.detectChanges();
          let div = fixture.nativeElement.querySelector('div');
          div.dispatchEvent(mouseenter);
          fixture.detectChanges();
          expect(div.style.backgroundColor).toEqual('red');
        });
    }));

    it('my-highlightで指定したcolorが、backgroundColorに設定されること', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      let template = '<div my-highlight="green">highlight me</div>';
      return tcb.overrideTemplate(TestComponent, template)
        .createAsync(TestComponent)
        .then((fixture) => {
          fixture.detectChanges();
          let div = fixture.nativeElement.querySelector('div');
          div.dispatchEvent(mouseenter);
          fixture.detectChanges();
          expect(div.style.backgroundColor).toEqual('green');
        });
    }));

    it('defaultColorで指定したcolorが、backgroundColorに設定されること', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      let template = '<div my-highlight="" [defaultColor]="\'yellow\'">highlight me</div>';
      return tcb.overrideTemplate(TestComponent, template)
        .createAsync(TestComponent)
        .then((fixture) => {
          fixture.detectChanges();
          let div = fixture.nativeElement.querySelector('div');
          div.dispatchEvent(mouseenter);
          fixture.detectChanges();
          expect(div.style.backgroundColor).toEqual('yellow');
        });
    }));
    
    it('my-highlightとdefaultColorを両方指定した場合は、my-highlightがbackgroundColorに設定されること', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      let template = '<div my-highlight="green" [defaultColor]="\'yellow\'">highlight me</div>';
      return tcb.overrideTemplate(TestComponent, template)
        .createAsync(TestComponent)
        .then((fixture) => {
          fixture.detectChanges();
          let div = fixture.nativeElement.querySelector('div');
          div.dispatchEvent(mouseenter);
          fixture.detectChanges();
          expect(div.style.backgroundColor).toEqual('green');
        });
    }));
    
  });

});

@Component({
  selector: 'container'
})
@View({
  directives: [HighlightDirective]
})
class TestComponent { }