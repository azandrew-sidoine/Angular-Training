import { Component, AfterViewInit, SkipSelf } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PostsService } from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
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
  posts$ = this.posts.posts$;
  // #endregion Component states

  constructor(@SkipSelf() private posts: PostsService) {}

  async ngAfterViewInit() {
    // firstValueFrom
    await lastValueFrom(this.posts.getAll());
  }
}
