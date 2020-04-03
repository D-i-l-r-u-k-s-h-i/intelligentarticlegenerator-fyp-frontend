import {createAction} from 'redux-actions'

export const GET_ARTICLES="GET_ARTICLES";
export const SUCCESS_GET_ARTICLES="SUCCESS_GET_ARTICLES";
export const FAIL_GET_ARTICLES="FAIL_GET_ARTICLES";

export default {
    getArticles:createAction(GET_ARTICLES),
    getArticlesSuccess:createAction(SUCCESS_GET_ARTICLES),
    getArticlesFail:createAction(FAIL_GET_ARTICLES)

}