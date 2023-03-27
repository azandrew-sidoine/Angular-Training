import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HeaderModule } from "./header";
import { PostRequestInterceptor, PostsModule } from "./posts";
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

@NgModule({
  declarations: [AppComponent],
  exports: [AppComponent],
  imports: [BrowserModule, SharedModule, PostsModule, HeaderModule],
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
