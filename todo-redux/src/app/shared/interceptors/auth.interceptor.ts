import { HttpInterceptor } from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
  // TODO: Redux implementation here
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    // const copiedReq = req.clone({headers: req.headers.set('', '')});

    // .map wraps the observable in a new observable which would fuck things up, which is why you use switchMap...
    /*
    * take(1) automagically unsubscribes the observable after the value has been gotten once, as select sets up an
    * ongoing observable which can cause unexpected behaviour.
    */

    // return this.store.select('auth')
    //   .take(1)
    //   .switchMap((authState: fromAuth.State) => {
    //     const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
    //     return next.handle(copiedReq);
    //   });

    return req;
  }
}

