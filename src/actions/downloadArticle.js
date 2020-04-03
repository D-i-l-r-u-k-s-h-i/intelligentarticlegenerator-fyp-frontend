import {createAction} from 'redux-actions'

export const DOWNLOAD_ARTICLE="DOWNLOAD_ARTICLE";
export const SUCCESS_DOWNLOAD_ARTICLE="SUCCESS_DOWNLOAD_ARTICLE";
export const FAIL_DOWNLOAD_ARTICLE="FAIL_DOWNLOAD_ARTICLE";

export default {
    downloadArticle:createAction(DOWNLOAD_ARTICLE),
    downloadArticleSuccess:createAction(SUCCESS_DOWNLOAD_ARTICLE),
    DdownloadArticleFail:createAction(FAIL_DOWNLOAD_ARTICLE)

}