import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SharedModule } from './shared.module';
import { PostsModule } from './posts';
import { HeaderModule } from './header';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [SharedModule, PostsModule, HeaderModule],
  template: `
    <app-header [name]="'Publication'"></app-header>
  `,
  styles: [
    `
      h1 {
        text-align: center;
      }
    `,
  ],
  providers: [],
})
export class App {}

bootstrapApplication(App);
