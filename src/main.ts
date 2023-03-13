import 'zone.js/dist/zone';
import { Component, InjectionToken, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { PipesModule } from './pipes';
import { interval, map } from 'rxjs';
import { PostsService, POST_FAKE, POST_URL } from './posts.service';
// import { getInjector } from './ioc';
// import { WebStorage } from './storage';
// import './create-dependencies';

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
  providers: [
    // Provider par class
    //   {
    //   provide: PostsService,
    //   useClass: PostsService
    // },
    PostsService,
    // Provider par valeur
    {
      provide: POST_URL,
      useValue: 'http://localhost',
    },
    {
      provide: POST_FAKE,
      useValue: false
    },
    // Provider par méthode de création
    {
      provide: PostsService,
      useFactory: (url: string, fake: boolean) => {
        // Fonction de créaction doit toujours retourner une valeur
        return new PostsService(url, fake);
      },
      deps: [POST_FAKE, POST_URL],
    },
  ],
})
export class App implements OnInit {
  name = 'Angular';
  today = new Date();

  // _destroy$ = new Subject<void>();

  // Produit par une source externe
  date$ = interval(1000).pipe(map(() => new Date()));

  // date!: Date;

  constructor(private posts: PostsService) {}

  ngOnInit(): void {
    console.log(this.posts.getAll().subscribe(console.log));
    // const webStorage = new WebStorage(getInjector().get<WebStorage>('local'));
    // const webStorage = getInjector().get<WebStorage>('Webstorage');
    // console.log(webStorage);
    // webStorage.setItem('my-item', ['Angular', 'ReactJS']);
    // this.date$.pipe(takeUntil(this._destroy$)).subscribe(state => this.date = state);
  }

  ngOnDestroy() {
    // this._destroy$.next();
  }
}

bootstrapApplication(App);
