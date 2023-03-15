import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { PostAddComponent } from './post-add.component';
import { PostsComponent } from './posts.component';

@NgModule({
  imports: [SharedModule],
  declarations: [PostsComponent, PostAddComponent],
  exports: [PostsComponent, PostAddComponent],
})
export class PostsModule {}