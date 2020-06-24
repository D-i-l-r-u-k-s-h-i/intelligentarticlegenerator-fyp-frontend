import {createAction} from 'redux-actions'

export const SIGN_UP="SIGN_UP";
export const SUCCESS_SIGN_UP="SUCCESS_SIGN_UP";
export const FAIL_SIGN_UP="FAIL_SIGN_UP";

export default {
    signUp:createAction(SIGN_UP),
    signUpSuccess:createAction(SUCCESS_SIGN_UP),
    signUpFail:createAction(FAIL_SIGN_UP)

}