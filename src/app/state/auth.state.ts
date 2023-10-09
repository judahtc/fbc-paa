

import { State, Action, StateContext } from '@ngxs/store';

export class SetAccessToken {
  static readonly type = '[Auth] Set Access Token';
  constructor(public token: string) {}
}

export class ClearAccessToken {
  static readonly type = '[Auth] Clear Access Token';
}


export interface AuthStateModel {
  token: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
  },
})


export class AuthState {
  @Action(SetAccessToken)
  setAccessToken(ctx: StateContext<AuthStateModel>, { token }: SetAccessToken) {
    ctx.patchState({ token });
  }

  @Action(ClearAccessToken)
  clearAccessToken(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ token: null });
  }
}
