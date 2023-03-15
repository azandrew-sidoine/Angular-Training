import { BehaviorSubject, Observable, timer, tap, map } from 'rxjs';
import { Post } from './types';

const POSTS: Post[] = [
  {
    title: 'Angular Training',
    id: new Date().getTime() + Math.random(),
    comments: [],
  },
  {
    title: 'ReactJS Training',
    id: new Date().getTime() + Math.random(),
    comments: [
      {
        content: 'ReactJS is an awesome UI framework',
      },
    ],
  },
];

export class PostsService {
  _post$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  posts$ = this._post$.asObservable();

  getAll(): Observable<boolean> {
    return timer(3000).pipe(
      tap(() => this._post$.next(POSTS)),
      map(() => true)
    );
  }

  addPost(post: Omit<Post, 'id'>): Observable<Post> {
    const _post: Post = {
      ...post,
      id: new Date().getTime() + Math.random(),
    } as Post;
    return timer(3000).pipe(
      tap(() => this._post$.next([...this._post$.getValue(), _post])),
      map(() => _post)
    );
  }
}
