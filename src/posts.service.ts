import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

// Création du token d'injection:
export const POST_URL = new InjectionToken<string>('POST_URL');
export const POST_FAKE = new InjectionToken<boolean>('POST_FAKE');

export type Post = {
  id: number;
  title: string;
  content: string;
  comments: string[];
};

const _defaultState = {
  performingAction: false as boolean,
  posts: [] as Post[],
};

type StateType = typeof _defaultState;

@Injectable()
export class PostsService {
  _posts$ = new BehaviorSubject<StateType>(_defaultState);
  public readonly posts$ = this._posts$.asObservable();

  getAll() {
    // Faire une appel API vers le serveur
    return this._posts$.pipe(map((state) => state.posts));
  }
}
