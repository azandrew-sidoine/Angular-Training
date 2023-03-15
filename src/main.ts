import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Publications!</h1>
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
