import { Action } from '@ngrx/store';
import { type } from '../util';
import { User } from '../models/user';
import { Pin } from '../models/pin';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  GET_PINS:                     type('[Pins] Get Pins'),
  GET_PINS_SUCESS:              type('[Pins] Get Pins Success'),
  GET_USER_PINS:                type('[Pins] Get User Pins'),
  GET_USER_PINS_SUCESS:         type('[Pins] Get User Pins Sucess')
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class GetPinsAction implements Action {
  type = ActionTypes.GET_PINS;

  constructor(public payload) { };
}

export class GetPinsSuccessAction implements Action {
  type = ActionTypes.GET_PINS_SUCESS;

  constructor(public payload: Pin[]){};
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = GetPinsAction
  | GetPinsSuccessAction