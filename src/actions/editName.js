import {createAction} from 'redux-actions'

export const EDIT_NAME="EDIT_NAME";
export const SUCCESS_EDIT_NAME="SUCCESS_EDIT_NAME";
export const FAIL_EDIT_NAME="FAIL_EDIT_NAME";

export default {
    editName:createAction(EDIT_NAME),
    editNameSuccess:createAction(SUCCESS_EDIT_NAME),
    editNameFail:createAction(FAIL_EDIT_NAME)
}