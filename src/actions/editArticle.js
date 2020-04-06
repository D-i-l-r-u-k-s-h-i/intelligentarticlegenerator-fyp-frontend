import {createAction} from 'redux-actions'

export const EDIT_ARTICLE="EDIT_ARTICLE";
export const SUCCESS_EDIT_ARTICLE="SUCCESS_EDIT_ARTICLE";
export const FAIL_EDIT_ARTICLE="FAIL_EDIT_ARTICLE";

export default {
    editArticle:createAction(EDIT_ARTICLE),
    editArticleSuccess:createAction(SUCCESS_EDIT_ARTICLE),
    editArticleFail:createAction(FAIL_EDIT_ARTICLE)
}