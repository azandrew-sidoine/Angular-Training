import { inject } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot
} from "@angular/router";
import { PostsService } from "./post.service";

export const postsResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PostsService).getAll();
};

export function postDetailResolver(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  return inject(PostsService).get(route.params["id"]);
}
