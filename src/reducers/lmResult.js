import {lmResultTypes,getGeneratedArticleTypes,CancelRequestTypes} from '../actions'

import {handleActions} from "redux-actions"

const initialState={
    lmData:null,
    generatedData:null
}

export default handleActions({
    [lmResultTypes.LM_RESULT]:(state,{payload})=>({
        ...state,loading:true
    }),
    [lmResultTypes.SUCCESS_LM_RESULT]:(state,{payload})=>({
        ...state,loading:false,lmData:payload
    }),
    [lmResultTypes.FAIL_LM_RESULT]:(state,{payload})=>({
        ...state,loading:false,lmData:null
    }),
    [getGeneratedArticleTypes.GET_GENERATED_ARTICLES]:(state,{payload})=>({
        ...state,loading:true
    }),
    [getGeneratedArticleTypes.SUCCESS_GET_GENERATED_ARTICLES]:(state,{payload})=>({
        ...state,loading:false,generatedData:payload
    }),
    [getGeneratedArticleTypes.FAIL_GET_GENERATED_ARTICLES]:(state,{payload})=>({
        ...state,loading:false,generatedData:null
    }),
    [CancelRequestTypes.CANCEL_REQUEST]:(state,{payload})=>({
        ...state,loading:true
    }),
    [CancelRequestTypes.SUCCESS_CANCEL_REQUEST]:(state,{payload})=>({
        ...state,loading:false,generatedData:payload
    }),
    [CancelRequestTypes.FAIL_CANCEL_REQUEST]:(state,{payload})=>({
        ...state,loading:false,generatedData:null
    }),
},initialState)