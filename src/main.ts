import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { PipesModule } from './pipes';
import { interval, map } from 'rxjs';
import { getInjector } from './ioc';
import { WebStorage } from './storage';
import './create-dependencies';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, PipesModule],
  template: `
    <h1>Hello from {{ name | uppercase | lowerfirst }}!</h1>

    <p>Format Anglais: {{ today | formatDate }}</p>
    <p>Format Francais: {{ today | formatDate:'fr'}}</p>
    <p *ngIf="date$ | async as date" >Current Date: {{ date | formatTime:'fr'}}</p>
    <p>Today: {{ today | date }}</p>
  `,
})
export class App implements OnInit {
  name = 'Angular';
  today = new Date();

  // _destroy$ = new Subject<void>();

  // Produit par une source externe
  date$ = interval(1000).pipe(map(() => new Date()));

  // date!: Date;

  ngOnInit(): void {
    const webStorage = new webStorage(getInjector().get<Storage>('session'));
    webStorage.setItem('my-item', ['Angular']);
    // this.date$.pipe(takeUntil(this._destroy$)).subscribe(state => this.date = state);
  }

  ngOnDestroy() {
    // this._destroy$.next();
  }
}

bootstrapApplication(App);
