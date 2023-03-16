import { Component } from '@angular/core';
import { PostsService } from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styles: [
    `
      .post-list-container {

      }
    `
  ],
  providers: [PostsService]
})
export class PostsComponent {
  // #region Component state
  post$ = this.posts.posts$;
  // #endregion Component states

  constructor(private posts: PostsService) {}
}
