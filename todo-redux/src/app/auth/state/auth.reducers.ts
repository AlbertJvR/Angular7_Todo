import { AuthActions, AuthActionType } from './auth.actions';
import { cloneDeep } from 'lodash';

export interface AuthState {
  token: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  token: '',
  authenticated: false
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case (AuthActionType.Signup):
    case (AuthActionType.Signin): {
      const newState = cloneDeep(action.payload);
      return {
        ...newState as AuthState,
        authenticated: true
      };
    }
    case (AuthActionType.Logout): {
      const newState = cloneDeep(action.payload);
      return {
        ...newState as AuthState,
        token: null,
        authenticated: false
      };
    }
    case (AuthActionType.SetToken): {
      return {
        ...state,
        token: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
