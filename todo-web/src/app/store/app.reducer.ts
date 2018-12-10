import { ActionReducerMap } from '@ngrx/store';
import * as AuthPackage from '../auth/store/auth.reducers';

export interface AppState {
  auth: AuthPackage.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthPackage.authReducer
};
