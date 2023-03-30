import { inject, Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanActivateChildFn,
    CanLoad,
    CanMatchFn,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from "@angular/router";
import { map, Observable } from "rxjs";
import { PostsService } from "./post.service";

// Utilisation des guards Object Orientés
// Version pre-angular 15
@Injectable({
  providedIn: "root",
})
export class PostModuleGuard implements CanLoad {
  //
  constructor(private posts: PostsService) {}

  //
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const result = sessionStorage.getItem("bearerToken");
    return typeof result !== "undefined" && result !== null;
  }
}

// Version angular <= 14
@Injectable({
  providedIn: "root",
})
export class ActivatePostDetailGuard implements CanActivate {
  //
  constructor(private posts: PostsService, private router: Router) {}

  //
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.posts.posts$.pipe(
      map((posts) => posts.length !== 0),
      map((result) =>
        result === true ? result : this.router.createUrlTree(["/"])
      )
    );
  }
}

// Version angular <= 14
@Injectable({
  providedIn: "root",
})
export class ActivatePostsGuard implements CanActivateChild {
  //
  constructor(private posts: PostsService, private router: Router) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const result = sessionStorage.getItem("bearerToken");
    return typeof result !== "undefined" && result !== null || this.router.createUrlTree(['/404']);
  }
}


// Utilisation des guards fonctionnels
// A partir de angular 15
export const canMatchPostsGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const result = sessionStorage.getItem("bearerToken");
  return typeof result !== "undefined" && result !== null;
};

// Version angular >= 15
export function canActivatePostDetail(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  const posts = inject(PostsService);
  const router = inject(Router);
  return posts.posts$.pipe(
    map((posts) => posts.length !== 0),
    map((result) => (result === true ? true : router.createUrlTree(["/"])))
  );
}

// A partir de angular 15
export const canActivatePosts: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const result = sessionStorage.getItem("bearerToken");
  return typeof result !== "undefined" && result !== null;
};
