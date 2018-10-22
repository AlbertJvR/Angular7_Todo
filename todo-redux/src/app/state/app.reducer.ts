import { ActionReducerMap } from '@ngrx/store';
import * as AuthPackage from '../auth/state/auth.reducers';

export interface AppState {
  auth: AuthPackage.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthPackage.authReducer
};
