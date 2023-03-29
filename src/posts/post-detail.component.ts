import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { PostsService } from "./post.service";
import { Post } from "./types";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.css"],
})
export class PostDetailComponent implements OnDestroy {
  //   @Input() postId: string | number;
  // post!: Post;
  // private subscriptions: Subscription[] = [];

  // Utilisation du snapshop pour récupérer les paramètres de la requête
  // post$ = this.posts.get(this.route.snapshot.params["id"]);

  // Ou via l'utilisation des observables
  post$!: Observable<Post>;

  constructor(private route: ActivatedRoute, private posts: PostsService) {
    console.log('Data: ',  this.route.snapshot.data);
    console.log('URL: ', this.route.snapshot.url);
    this.post$ = this.route.params.pipe(
      // version - map
      // - map est un opérateur RxJs qui prend en paramètre une fonction qui retourne une valeur simple
      // c'est à dire une valeur qui n'est pas observable
      // map(params => params['id']),
      // tap((params) => {
      //   this.subscriptions.push(this.posts.get(params["id"]).subscribe((result) => (this.post = result)));
      // }),
      // mergeMap - quant à accepte en paramètre une fonction qui retourne un observable
      // switchMap() - Pareil que mergeMap mais encore mieux
      // concatMap() - Exécute les observable dans l'ordre d'arriver
      switchMap((params) => this.posts.get(params["id"]))
    );
  }

  ngOnDestroy(): void {
    // for (const subscription of this.subscriptions) {
    //   subscription.unsubscribe();
    // }
  }
}
