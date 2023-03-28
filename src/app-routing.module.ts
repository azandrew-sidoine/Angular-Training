import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { App404Component } from './404';
import { HomeComponent } from "./home/home.component";
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {
    // path: '',
    // component: HomeComponent

    // Or par redirection
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "posts",
    component: PostsComponent
  },
  {
    path: "**",
    component: App404Component
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
