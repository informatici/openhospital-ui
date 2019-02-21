/**
 * In your reducer, use this helper to define reducer switch, like:
 * 
 * switch(action.type) {
 *  case REQUEST(SOME_ACTION):
 *      return {
 *          ...state,
 *          loading: true
 *      };
 *  case SUCCESS(SOME_ACTION):
 *      return {
 *          ...state,
 *          loading: false
 *      };
 *  case FAILURE(SOME_ACTION):
 *      return {
 *          ...state,
 *          loading: false,
 *          error: action.error
 *      };
 * }
 */

import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';

/**
 * Appends REQUEST async action type
 */
export const REQUEST = (actionName: string) => `${actionName}_${PENDING}`;

/**
 * Appends SUCCESS async action type
 */
export const SUCCESS = (actionName: string) => `${actionName}_${FULFILLED}`;

/**
 * Appends FAILURE async action type
 */
export const FAILURE = (actionName: string) => `${actionName}_${REJECTED}`;
