import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared.module";
import { PostAddComponent } from "./post-add.component";
import { PostCardComponent } from "./post-card-component";
import { PostDetailComponent } from "./post-detail.component";
import { PostListComponent } from "./post-list.component";
import { PostRouterOutletComponent } from "./post-router.component";
import { PostRoutingModule } from "./post-routing.module";
// import { PostsService } from './post.service';
import { InputModelDirective } from './directives';
import { PostsComponent } from "./posts.component";

@NgModule({
  imports: [SharedModule, PostRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [
    PostsComponent,
    PostAddComponent,
    PostListComponent,
    PostCardComponent,
    PostDetailComponent,
    PostRouterOutletComponent,
    InputModelDirective
  ],
  exports: [PostsComponent, PostAddComponent],
  providers: [],
  bootstrap: [PostRouterOutletComponent],
})
export class PostsModule {
  // static forRoot(): any {
  //   return {
  //     ngModule: PostsModule,
  //     providers: [PostsService]
  //   };
  // }
}
