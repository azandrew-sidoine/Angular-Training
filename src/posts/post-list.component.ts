import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from './types';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styles: [
    `
      .post-card-list-container {
        display: flex;
        align-items: flex-start;
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
  @Input() posts!: Post[];
  @Output('post-click') postClick = new EventEmitter<Post>();


  onPostClicked(event: Post) {
    this.postClick.emit(event);
  }
}
