import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { UrlMatch } from "src/helpers";
import { Post } from "./types";

@Injectable()
export class PostRequestInterceptor implements HttpInterceptor {
  @UrlMatch("posts")
  intercept(
    req: HttpRequest<Post>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log("Running in post interceptor...");
    req = req.clone({
      setHeaders: {
        Authorization: "Basic " + btoa("azandrew:homestead"),
      },
      //   reportProgress: true,
    });

    // if (req.url.match('posts')) {
    //     console.log('Request match posts...');
    // }
    // return of(
    //   new HttpResponse({
    //     headers,
    //     status: 200,
    //     statusText: "OK",
    //   })
    // );
    return next.handle(req).pipe(
      //   filter((response) => response instanceof HttpResponse),
      tap(console.log),
      catchError((err) => {
        console.log(err);
        // Gestion des erreur lors de la requête HTTP
        if (err instanceof HttpErrorResponse) {
          console.error("ERROR!", err);
        }
        return throwError(() => err);
      })
    );
  }
}
