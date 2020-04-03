import {saveArticleTypes,downloadArticleTypes,getArticleTypes} from '../actions'

import {handleActions} from "redux-actions"

const initialState={
    articleData:null,
    contentData:null
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
        ...state,loading:false,articleData:payload
    }),
    [getArticleTypes.FAIL_GET_ARTICLES]:(state,{payload})=>({
        ...state,loading:false,articleData:null
    }),
},initialState)