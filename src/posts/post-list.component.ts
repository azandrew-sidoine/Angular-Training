import { Component, Input } from '@angular/core';
import { Post } from './types';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styles: [
    `
      .post-card-list-container {
        display: flex;
        align-item: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .card-container {
        display: inline;
        padding: 16px 8px;
      }
    `,
  ],
})
export class PostListComponent {
  @Input() posts: Post[];
}
