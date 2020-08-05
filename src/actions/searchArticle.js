import {createAction} from 'redux-actions'

export const SEARCH_ARTICLE="SEARCH_ARTICLE";
export const SUCCESS_SEARCH_ARTICLE="SUCCESS_SEARCH_ARTICLE";
export const FAIL_SEARCH_ARTICLE="FAIL_SEARCH_ARTICLE";

export default {
    searchArticle:createAction(SEARCH_ARTICLE),
    searchArticleSuccess:createAction(SUCCESS_SEARCH_ARTICLE),
    searchArticleFail:createAction(FAIL_SEARCH_ARTICLE)

}