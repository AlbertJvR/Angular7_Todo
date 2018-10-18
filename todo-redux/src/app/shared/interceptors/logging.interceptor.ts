import { HttpInterceptor } from '@angular/common/http';

export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      event => {
        console.log('Logging interceptor', event);
      }
    );
  }
}
