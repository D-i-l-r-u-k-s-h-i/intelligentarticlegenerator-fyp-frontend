import {createAction} from 'redux-actions'

export const LM_RESULT="LM_RESULT";
export const SUCCESS_LM_RESULT="SUCCESS_LM_RESULT";
export const FAIL_LM_RESULT="FAIL_LM_RESULT";

export default {
    lmResult:createAction(LM_RESULT),
    lmResultSuccess:createAction(SUCCESS_LM_RESULT),
    lmResultFail:createAction(FAIL_LM_RESULT)

}