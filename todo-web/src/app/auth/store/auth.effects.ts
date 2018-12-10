// import { HttpResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Actions, Effect } from '@ngrx/effects';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import { UserModel } from '../../shared/models/user.model';
// import { AuthService } from '../services/auth.service';
// import { AuthActions, AuthActionType, SetToken, Signin, Signup } from './auth.actions';
//
// @Injectable()
// export class AuthEffects {
//   constructor(private actions$: Actions,
//               private router: Router,
//               private authService: AuthService) {}
//   @Effect()
//   authSignUp = this.actions$
//     .ofType(AuthActionType.TrySignup)
//     .map((action: AuthActions) => {
//       return action.payload;
//     })
//     .switchMap((authData: UserModel) => {
//       return this.authService.signUp(authData);
//     })
//     .mergeMap((response: HttpResponse<UserModel>) => {
//       return [
//         new Signup(null),
//         new SetToken(response.headers.get('x-auth'))
//       ];
//     });
//
//   @Effect()
//   authSignIn = this.actions$
//     .ofType(AuthActionType.TrySignIn)
//     .map((action: AuthActions) => {
//       return action.payload;
//     })
//     .switchMap((authData: UserModel) => {
//       return this.authService.signIn(authData);
//     })
//     .mergeMap((response: HttpResponse<UserModel>) => {
//       this.router.navigate(['/']);
//       return [
//         new Signin(null),
//         new SetToken(response.headers.get('x-auth'))
//       ];
//     });
//
//   @Effect({dispatch: false})
//   authLogout = this.actions$
//     .ofType(AuthActionType.Logout)
//     .do(() => {
//       this.router.navigate(['/']);
//     });
// }
