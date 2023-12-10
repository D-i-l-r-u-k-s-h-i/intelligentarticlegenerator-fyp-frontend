import {saveArticleTypes,downloadArticleTypes,getArticleTypes,editArticleTypes,getHtmlTypes,editNameTypes,deleteArticleTypes,searchArticleTypes} from '../actions'

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
    [searchArticleTypes.SEARCH_ARTICLE]:(state,{payload})=>({
        ...state,loading:true
    }),
    [searchArticleTypes.SUCCESS_SEARCH_ARTICLE]:(state,{payload})=>({
        ...state,loading:false,articlesData:payload
    }),
    [searchArticleTypes.FAIL_SEARCH_ARTICLE]:(state,{payload})=>({
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
    [editNameTypes.EDIT_NAME]:(state,{payload})=>({
        ...state, addItem: {
            ...state.addItem,
            loading:true,
            articlesData: payload
        }
    }),
    [editNameTypes.SUCCESS_EDIT_NAME]:(state,{payload})=>{
        // console.log(state)
        // console.log(state.addItem.articlesData)

        if (state.articlesData && Array.isArray(state.articlesData) && state.articlesData.length !== 0) {
            state.articlesData && state.articlesData.map((removeId, index) => {
                // console.log(removeId)
                // console.log(object)
                if (removeId.id == state.addItem.articlesData.articleId) {
                    // console.log(state.addItem.articlesData.editedName)
                    state.addItem.articlesData.articleName=state.addItem.articlesData.editedName
                    state.addItem.articlesData.articleData=removeId.articleData
                    state.addItem.articlesData.articleFile=removeId.articleFile
                    state.addItem.articlesData.createdDate=removeId.createdDate
                    state.addItem.articlesData.dateTime=removeId.dateTime
                    state.addItem.articlesData.lastModifiedDate=removeId.lastModifiedDate
                    state.addItem.articlesData.articleStatus=removeId.articleStatus
                    state.addItem.articlesData.id=removeId.id
                    
                    console.log(state.addItem.articlesData)
                    return state.articlesData.splice(index, 1, state.addItem.articlesData)
                }
                })

        }
        
        return {
            ...state,
            addItem: {
                ...state.addItem,
                loading: false,
                addItem: true,
                addItemError: undefined
            }
        }
    },
    [editNameTypes.FAIL_EDIT_NAME]:(state,{payload})=>({
        ...state,loading:false,articlesData:null
    }),
    [deleteArticleTypes.DELETE_ARTICLE]:(state,{payload})=>({
        ...state, removeItem: {
            ...state.removeItem,
            loading:true,
            articlesData: payload
        }
    }),
    [deleteArticleTypes.SUCCESS_DELETE_ARTICLE]:(state,{payload})=>{
        // console.log(payload)
        console.log(state)
        if (state.articlesData && Array.isArray(state.articlesData) && state.articlesData.length !== 0) {
            state.articlesData && state.articlesData.map((removeId, index) => {
                console.log(removeId.craftId)
                console.log(state.removeItem.articlesData)
                if (removeId.id == state.removeItem.articlesData) {
                    return state.articlesData.splice(index, 1);
                }
            })
        }
        return {
            ...state,
            removeItem: {
                ...state.removeItem,
                loading: false,
                removeItem: true,
                removeItemError: undefined,
            }
        }
    },
    [deleteArticleTypes.FAIL_DELETE_ARTICLE]:(state,{payload})=>({
        ...state,loading:false,articlesData:null
    }),
},initialState)