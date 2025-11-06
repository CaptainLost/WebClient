import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

export function credentialsInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const reqWithCredentials = req.clone({
    withCredentials: true
  });
  
  return next(reqWithCredentials);
}
