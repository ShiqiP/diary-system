import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
export const commonInterceptor: (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => Observable<HttpEvent<unknown>> = (req, next) => {
  const token = sessionStorage.getItem('token') || '';
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', token),
    url: 'http://localhost:8000' + req.url,
  });

  return next(modifiedReq).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        const body = event.body as ApiResponse<any>;
        return event.clone({
          body: body.data,
        });
        // Extract only the 'data' field
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      throw error; // Optionally, return an empty observable if desired
    }),
  );
};
