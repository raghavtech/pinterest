import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AuthenticationService } from '../services/authentication';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as userAuth from '../actions/user-auth';
import { AppState } from '../reducers/index';
import { LoginSuccessAction, LogoutAction } from '../actions/user-auth';

@Injectable()
export class UserAuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private store: Store<AppState>
  ) {}

  @Effect() login$: Observable<Action> = this.actions$
    .ofType(userAuth.ActionTypes.LOGIN)
    .map((action: userAuth.LoginAction) => action.payload)
    .switchMap((provider) => this.authService.login(provider))
    .filter((payload) => payload.user != null)
    .map((payload) => this.authService.storeNewUser(payload))
    .map((payload) => new userAuth.LoginSuccessAction(payload))
  
  @Effect() logout$: Observable<Action> = this.actions$
    .ofType(userAuth.ActionTypes.LOGOUT)
    .switchMap(() => this.authService.logout())
    .filter((payload) => payload.user == null)    
    .map((payload) => new userAuth.LogoutSuccessAction(payload))
  
  @Effect() checkAuth$: Observable<Action> = this.actions$
    .ofType(userAuth.ActionTypes.CHECK_AUTH)
    .switchMap(() => this.authService.authStatus())
    .filter((payload) => payload.user != null)
    .map((payload) => new userAuth.CheckAuthSuccessAction(payload))

}