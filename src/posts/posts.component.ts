import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { lastValueFrom, Observable } from "rxjs";
import { PostsService } from "./post.service";
import { Post } from "./types";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styles: [
    `
      .post-list-container {
      }
    `,
  ],
  // providers: [PostsService],
})
export class PostsComponent implements AfterViewInit {
  // #region Component state
  posts$!: Observable<Post[]>;
  // #endregion Component states

  constructor(
    /*@SkipSelf()*/ private posts: PostsService,
    private router: Router
  ) {
    this.posts$ = this.posts.posts$;
  }

  async ngAfterViewInit() {
    // firstValueFrom
    await lastValueFrom(this.posts.getAll());

    // setInterval(async () => {
    //   await lastValueFrom(
    //     this.posts.addPost({
    //       title: 'Paul dis que Fernanda ment!',
    //       comments: [],
    //     })
    //   );
    // }, 2000);
  }

  async savePost(value: string) {
    // Crée une promesse basé sur l'observable lorsque ce dernier `complete`
    await lastValueFrom(this.posts.addPost({ title: value, comments: [] }));
  }

  onPostClicked(event: Post) {
    // this.router.navigateByUrl(`/posts/${event.id}`);
    this.router.navigate(["/posts", event.id]);
  }
}
