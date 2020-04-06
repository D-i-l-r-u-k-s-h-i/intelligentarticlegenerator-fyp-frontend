import {saveArticleTypes,downloadArticleTypes,getArticleTypes,editArticleTypes,getHtmlTypes} from '../actions'

import {handleActions} from "redux-actions"

const initialState={
    articleData:null,
    contentData:null,
    htmlData:null,
    articlesData:null
}

export default handleActions({
    [saveArticleTypes.SAVE_ARTICLE]:(state,{payload})=>({
        ...state,loading:true
    }),
    [saveArticleTypes.SUCCESS_SAVE_ARTICLE]:(state,{payload})=>({
        ...state,loading:false,articleData:payload
    }),
    [saveArticleTypes.FAIL_SAVE_ARTICLE]:(state,{payload})=>({
        ...state,loading:false,articleData:null
    }),
    [editArticleTypes.EDIT_ARTICLE]:(state,{payload})=>({
        ...state,loading:true
    }),
    [editArticleTypes.SUCCESS_EDIT_ARTICLE]:(state,{payload})=>({
        ...state,loading:false,articleData:payload
    }),
    [editArticleTypes.FAIL_EDIT_ARTICLE]:(state,{payload})=>({
        ...state,loading:false,articleData:null
    }),
    [downloadArticleTypes.DOWNLOAD_ARTICLE]:(state,{payload})=>({
        ...state,loading:true
    }),
    [downloadArticleTypes.SUCCESS_DOWNLOAD_ARTICLE]:(state,{payload})=>({
        ...state,loading:false,contentData:payload
    }),
    [downloadArticleTypes.FAIL_DOWNLOAD_ARTICLE]:(state,{payload})=>({
        ...state,loading:false,contentData:null
    }),
    [getArticleTypes.GET_ARTICLES]:(state,{payload})=>({
        ...state,loading:true
    }),
    [getArticleTypes.SUCCESS_GET_ARTICLES]:(state,{payload})=>({
        ...state,loading:false,articlesData:payload
    }),
    [getArticleTypes.FAIL_GET_ARTICLES]:(state,{payload})=>({
        ...state,loading:false,articlesData:null
    }),
    [getHtmlTypes.GET_HTML_TEXT]:(state,{payload})=>({
        ...state,loading:true
    }),
    [getHtmlTypes.SUCCESS_GET_HTML_TEXT]:(state,{payload})=>({
        ...state,loading:false,htmlData:payload
    }),
    [getHtmlTypes.FAIL_GET_HTML_TEXT]:(state,{payload})=>({
        ...state,loading:false,htmlData:null
    }),
},initialState)