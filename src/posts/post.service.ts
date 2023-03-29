import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { Post } from "./types";

const POSTS: Post[] = [
  {
    title: "Angular Training",
    id: new Date().getTime() + Math.random(),
    comments: [],
  },
  {
    title: "ReactJS Training",
    id: new Date().getTime() + Math.random(),
    comments: [
      {
        content: "ReactJS is an awesome UI framework",
      },
    ],
  },
];

@Injectable({
  providedIn: "root",
})
export class PostsService {
  _post$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  posts$ = this._post$.asObservable();

  public constructor(private httpClient: HttpClient) {}

  get(id: string | number): Observable<Post> {
    return this.posts$.pipe(
      map((posts) => posts.find((post) => post.id.toString() === id.toString()))
    );
  }

  getAll(): Observable<boolean> {
    // return timer(1500).pipe(
    //   // tap(() => this._post$.next(POSTS)),
    //   mergeMap(() => this.httpClient.get('http://localhost:3000/posts')),
    //   map(() => true)
    // );
    return this.httpClient
      .get<Post[]>("http://localhost:3000/posts", {
        // headers: {
        //   "Content-Type": "text/plain", // application/json
        // },
        // params: {
        //   id: 1,
        // },
        // responseType: 'arraybuffer' // Default: json : blob - Pour les fichier en Blob
      })
      .pipe(
        tap(console.log),
        map((response) => this._post$.next(response)),
        map(() => true)
      );
  }

  addPost(post: Omit<Post, "id">): Observable<Post> {
    const _post: Post = { ...post } as Post;
    // return timer(3000).pipe(
    //   tap(() => this._post$.next([...this._post$.getValue(), _post])),
    //   map(() => _post)
    // );
    return this.httpClient
      .post<Post>("http://localhost:3000/posts", _post)
      .pipe(
        tap((post) => {
          this._post$.next([...this._post$.getValue(), post]);
        })
      );
  }
}
