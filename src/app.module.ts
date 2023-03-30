import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { App404Component } from "./404";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { HeaderModule } from "./header";
import { HomeComponent } from "./home/home.component";
import { PostRequestInterceptor } from "./posts";
import { PostsService } from "./posts/post.service";
import { SharedModule } from "./shared.module";

// const MY_INTERCEPTORS  = new InjectionToken<HttpInterceptor[]>('', {
//   factory: () => ([new PostRequestInterceptor, new PostRequestInterceptor, new PostRequestInterceptor])
// });

// class MyService
// {
//   public constructor(@Inject(MY_INTERCEPTORS) private interceptors: HttpInterceptor[]) {

//   }

//   get(method: string, url: string) {
//     //
//     const request = new HttpRequest(method as any, url);
//     return this.interceptors.reduce((carry, current) => interceptor.intercept(request, (request) => of(new HttpResponse()) as any));
//   }
// }

// app-routing.module.ts
// const routes: Routes = [
//   {
//     // path: '',
//     // component: HomeComponent

//     // Or par redirection
//     path: "",
//     redirectTo: "home",
//     pathMatch: "full",
//   },
//   {
//     path: "home",
//     component: HomeComponent,
//   },
//   {
//     path: "posts",
//     component: PostsComponent
//   },
//   {
//     path: "**",
//     component: App404Component
//   }
// ];

@NgModule({
  declarations: [AppComponent, HomeComponent, App404Component],
  exports: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    HeaderModule,
    // RouterModule.forRoot(routes, {
    //   useHash: true
    // }),
    AppRoutingModule
    // RouterModule.forRoot(),
  ],
  providers: [
    PostsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PostRequestInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
