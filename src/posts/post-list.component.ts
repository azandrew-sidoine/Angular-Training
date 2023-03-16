import { Component, Input } from "@angular/core";
import { Post } from "./types";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styles: [
    `
      .card-container {
        padding: 16px 8px;
      }
    `
  ]
})
export class PostListComponent
{
  @Input() posts: Post[];

}