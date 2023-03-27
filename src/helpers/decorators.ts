import { Observable } from "rxjs";

export type _HttpRequest<T> = {
  body: T | null;
  url: string;
};

export type _HttpHandler<T> = {
  handle(req: _HttpRequest<any>): Observable<T>;
};

export function UrlMatch(url: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = (
      req: _HttpRequest<unknown>,
      next: _HttpHandler<unknown>
    ) => {
      if (!req.url.match(url)) {
        return next.handle(req);
      }
      return method(req, next);
    };
  };
}
