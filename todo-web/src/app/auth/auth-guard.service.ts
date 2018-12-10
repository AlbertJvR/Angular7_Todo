import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  // constructor(private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.store.select('auth')
    //   .take(1)
    //   .map((authState: fromAuth.State) => {
    //     return authState.authenticated;
    //   });

    return true;
  }
}