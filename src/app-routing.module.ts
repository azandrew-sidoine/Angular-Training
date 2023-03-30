import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { App404Component } from "./404";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  // {
  //   path: "posts/:id",
  //   component: PostDetailComponent,
  //   data: {
  //     posts: [{
  //       title: 'Fake Post',
  //       id: new Date().getTime()
  //     }]
  //   }
  // },
  // {
  //   path: "posts",
  //   component: PostsComponent
  // },
  {
    path: "posts",
    loadChildren: () =>
      import("./posts/posts.module").then((m) => m.PostsModule),

    // Version Angular <= 14
    // canLoad: [PostModuleGuard],

    // Version Angular >= 15
    // canMatch: [canMatchPostsGuard],
  },
  {
    // path: '',
    // component: HomeComponent

    // Or par redirection
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "**",
    component: App404Component,
  },
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
