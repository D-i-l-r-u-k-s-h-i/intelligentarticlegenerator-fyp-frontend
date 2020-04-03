import {createAction} from 'redux-actions'

export const LOGIN="LOGIN";
export const SUCCESS_LOGIN="SUCCESS_LOGIN";
export const FAIL_LOGIN="FAIL_LOGIN";

export default {
    login:createAction(LOGIN),
    loginSuccess:createAction(SUCCESS_LOGIN),
    loginFail:createAction(FAIL_LOGIN)

}