import { Action } from '@ngrx/store';
import { UserModel } from '../../shared/models/user.model';

export enum AuthActionType {
  Signup = '[Auth] Signup',
  Signin = '[Auth] Signin',
  Logout = '[Auth] Logout',
  TrySignup = '[Auth] TrySignup',
  TrySignIn = '[Auth] TrySignIn',
  SetToken = '[Auth] SetToken'
}

export class TrySignup implements Action {
  readonly type = AuthActionType.TrySignup;
  constructor (public payload: UserModel) {}
}

export class TrySignin implements Action {
  readonly type = AuthActionType.TrySignIn;
  constructor (public payload: UserModel) {}
}

export class Signup implements Action {
  readonly type = AuthActionType.Signup;
  constructor (public payload: any) {}
}

export class Signin implements Action {
  readonly type = AuthActionType.Signin;
  constructor (public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionType.Logout;
  constructor (public payload: any) {}
}

export class SetToken implements Action {
  readonly type = AuthActionType.SetToken;
  constructor (public payload: string) {}
}

export type AuthActions = TrySignup | TrySignin | Signup | Signin | Logout | SetToken;
