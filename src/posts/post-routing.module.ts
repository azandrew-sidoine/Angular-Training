import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostDetailComponent } from "./post-detail.component";
import {
  ActivatePostDetailGuard,
  ActivatePostsGuard
} from "./post-module-guard.service";
import { PostRouterOutletComponent } from "./post-router.component";
import { PostsComponent } from "./posts.component";
import { postDetailResolver, postsResolver } from "./resolver";

const routes: Routes = [
  {
    // Voici la route pricipale
    path: "",
    component: PostRouterOutletComponent,
    // Angular <= 14
    canActivateChild: [ActivatePostsGuard],
    resolve: {
      _: postsResolver,
    },
    // Angular >= 15
    // canActivateChild: [canActivatePosts],
    // Voici les enfants de la route principale
    // **Note** Les chemins vers les routes enfants seront préfixés par le chemin vers la route principal
    children: [
      {
        path: ":id", // posts/:id
        component: PostDetailComponent,
        // Angular >= 15
        // canActivate: [canActivatePostDetail],

        // Angular <= 14
        resolve: {
          post: postDetailResolver,
        },
        canActivate: [ActivatePostDetailGuard],
        data: {
          posts: [
            {
              title: "Fake Post",
              id: new Date().getTime(),
            },
          ],
        },
      },
      {
        path: "", // posts
        component: PostsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  // RouterModule.forChild() doit être utiliser a la place de RouterModule.forRoot() dans le modules filles de
  // votre application angular
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
