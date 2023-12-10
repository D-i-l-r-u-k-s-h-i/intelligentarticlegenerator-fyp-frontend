import {createAction} from 'redux-actions'

export const CANCEL_REQUEST="CANCEL_REQUEST";
export const SUCCESS_CANCEL_REQUEST="SUCCESS_CANCEL_REQUEST";
export const FAIL_CANCEL_REQUEST="FAIL_CANCEL_REQUEST";

export default {
    cancelRequest:createAction(CANCEL_REQUEST),
    cancelRequestSuccess:createAction(SUCCESS_CANCEL_REQUEST),
    cancelRequestFail:createAction(FAIL_CANCEL_REQUEST)

}