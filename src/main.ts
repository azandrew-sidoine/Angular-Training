import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SharedModule } from './shared.module';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [SharedModule],
  template: `
    <h1>Publications!</h1>

    <app-posts></app-posts>
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
