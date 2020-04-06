import {createAction} from 'redux-actions'

export const GET_HTML_TEXT="GET_HTML_TEXT";
export const SUCCESS_GET_HTML_TEXT="SUCCESS_GET_HTML_TEXT";
export const FAIL_GET_HTML_TEXT="FAIL_GET_HTML_TEXT";

export default {
    getHTMLText:createAction(GET_HTML_TEXT),
    getHTMLTextSuccess:createAction(SUCCESS_GET_HTML_TEXT),
    getHTMLTextFail:createAction(FAIL_GET_HTML_TEXT)

}