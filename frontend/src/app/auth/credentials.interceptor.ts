import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // send cookies (Spring Session) with every request
  return next(req.clone({ withCredentials: true }));
};
