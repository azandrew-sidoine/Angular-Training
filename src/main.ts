import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SharedModule } from './shared.module';
import { PostsModule } from './posts';
import { HeaderModule } from './header';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [SharedModule, PostsModule, HeaderModule],
  template: `
    <app-header [name]="'Publication'"></app-header>

    <div class="container">
      <app-post-add></app-post-add>
    </div>
  `,
  styles: [
    `
      h1 {
        text-align: center;
      }
      .container {
        margin: 16px;
      }
    `,
  ],
  providers: [],
})
export class App {
  private _subject = new Subject<string>();
  _subject$ = this._subject.asObservable();

  constructor() {
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 5) {
        clearInterval(interval);
      }
      const value = `Fernanda${Array.from(new Array(count).keys())
        .map(() => '!')
        .join('')}`;
      console.log('Produced value: ', value);
      this._subject.next(value);
      count += 1;
    }, 1000);


    setTimeout(() => {
      this._subject$.subscribe((state) => console.log('Received value: ', state));
    }, 2000);
  }
}

bootstrapApplication(App);
