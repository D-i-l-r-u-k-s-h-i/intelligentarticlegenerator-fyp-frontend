import {createAction} from 'redux-actions'

export const GET_GENERATED_ARTICLES="GET_GENERATED_ARTICLES";
export const SUCCESS_GET_GENERATED_ARTICLES="SUCCESS_GET_GENERATED_ARTICLES";
export const FAIL_GET_GENERATED_ARTICLES="FAIL_GET_GENERATED_ARTICLES";

export default {
    getGeneratedArticles:createAction(GET_GENERATED_ARTICLES),
    getGeneratedArticlesSuccess:createAction(SUCCESS_GET_GENERATED_ARTICLES),
    getGeneratedArticlesFail:createAction(FAIL_GET_GENERATED_ARTICLES)

}