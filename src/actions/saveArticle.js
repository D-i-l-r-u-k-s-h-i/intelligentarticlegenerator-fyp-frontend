import {createAction} from 'redux-actions'

export const SAVE_ARTICLE="SAVE_ARTICLE";
export const SUCCESS_SAVE_ARTICLE="SUCCESS_SAVE_ARTICLE";
export const FAIL_SAVE_ARTICLE="FAIL_SAVE_ARTICLE";

export default {
    saveArticle:createAction(SAVE_ARTICLE),
    saveArticleSuccess:createAction(SUCCESS_SAVE_ARTICLE),
    saveArticleFail:createAction(FAIL_SAVE_ARTICLE)

}