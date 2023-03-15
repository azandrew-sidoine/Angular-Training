import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { PostsComponent } from './posts.component';

@NgModule({
  imports: [SharedModule],
  declarations: [PostsComponent],
  exports: [PostsComponent],
})
export class PostsModule {}
