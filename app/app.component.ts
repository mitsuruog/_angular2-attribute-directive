import {Component, OnInit} from 'angular2/core';
import {Logger} from './common/services/logger.service';
import {HighlightDirective} from './components/highlight.directive';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  styleUrls: ['app/app.css'],
  providers: [Logger],
  directives: [HighlightDirective]
})

export class AppComponent {

  constructor(private logger: Logger) { }

  ngOnInit() {
    this.logger.log('Alo!! Alo!!');
  }

}