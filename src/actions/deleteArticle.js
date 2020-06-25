import {createAction} from 'redux-actions'

export const DELETE_ARTICLE="DELETE_ARTICLE";
export const SUCCESS_DELETE_ARTICLE="SUCCESS_DELETE_ARTICLE";
export const FAIL_DELETE_ARTICLE="FAIL_DELETE_ARTICLE";

export default {
    deleteArticle:createAction(DELETE_ARTICLE),
    deleteArticleSuccess:createAction(SUCCESS_DELETE_ARTICLE),
    deleteArticleFail:createAction(FAIL_DELETE_ARTICLE)

}