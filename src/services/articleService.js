import {createLogic} from 'redux-logic'

import {saveArticleActions,saveArticleTypes,
        downloadArticleActions, downloadArticleTypes,
        getArticleActions,getArticleTypes,
        editArticleActions,editArticleTypes,
        getHtmlActions, getHtmlTypes,
        editNameActions,editNameTypes,
        deleteArticleActions,deleteArticleTypes,
        searchArticleActions,searchArticleTypes
} from "../actions"

import * as endPoints from './endpoints'
import * as api from './HTTPclient'

const savearticle=createLogic({
    type:saveArticleTypes.SAVE_ARTICLE,
    latest:true,
    debounce:1000,

    process({
        action
    },dispatch,done){
        let HTTPclient=api

        // debugger
        console.log("payload check",action.payload)

        let obj={
            articleData:action.payload.articleText,
            articleName:action.payload.articlename
        }

        HTTPclient.post(endPoints.SAVE_ARTICLE,obj)
            .then(resp=> {
                // debugger
                console.log(resp.data)
                dispatch(saveArticleActions.saveArticleSuccess(resp.data))
            })
            .catch(err=>{
                var errormsg="Failed to save Article";
                if (err && err.code === "ECONNABORTED") {
                    errormsg = "Please check your internet connection.";
                }
                dispatch(saveArticleActions.saveArticleFail(errormsg))
            }).then(()=>done());
    }
})

const downloadarticle=createLogic({
    type:downloadArticleTypes.DOWNLOAD_ARTICLE,
    latest:true,
    debounce:1000,

    process({
        action
    },dispatch,done){
        let HTTPclient=api

        // debugger
        console.log("payload check",action.payload)

        HTTPclient.post(endPoints.DOWNLOAD_ARTICLE+action.payload)
            .then(resp=> {
                // debugger
                console.log(resp.data)
                dispatch(downloadArticleActions.downloadArticleSuccess(resp.data))
            })
            .catch(err=>{
                var errormsg="Failed to download Article";
                if (err && err.code === "ECONNABORTED") {
                    errormsg = "Please check your internet connection.";
                }
                dispatch(downloadArticleActions.DdownloadArticleFail(errormsg))
            }).then(()=>done());
    }
})

const getarticles=createLogic({
    type:getArticleTypes.GET_ARTICLES,
    latest:true,
    debounce:1000,

    process({
        action
    },dispatch,done){
        let HTTPclient=api

        // debugger
        console.log("payload check",action.payload)

        HTTPclient.get(endPoints.GET_ARTICLES)
            .then(resp=> {
                // debugger
                console.log(resp.data)
                dispatch(getArticleActions.getArticlesSuccess(resp.data))
            })
            .catch(err=>{
                var errormsg="Failed to get Articles";
                if (err && err.code === "ECONNABORTED") {
                    errormsg = "Please check your internet connection.";
                }
                dispatch(getArticleActions.getArticlesFail(errormsg))
            }).then(()=>done());
    }
})

const editarticle=createLogic({
    type:editArticleTypes.EDIT_ARTICLE,
    latest:true,
    debounce:1000,

    process({
        action
    },dispatch,done){
        let HTTPclient=api

        // debugger
        console.log("payload check",action.payload)

        let obj={
            id:action.payload.articleid,
            articleData:action.payload.articleContent
        }

        HTTPclient.post(endPoints.EDIT_ARTICLE,obj)
            .then(resp=> {
                // debugger
                console.log(resp.data)
                dispatch(editArticleActions.editArticleSuccess(resp.data))
            })
            .catch(err=>{
                var errormsg="Failed to download Article";
                if (err && err.code === "ECONNABORTED") {
                    errormsg = "Please check your internet connection.";
                }
                dispatch(editArticleActions.editArticleFail(errormsg))
            }).then(()=>done());
    }
})

const editarticlename=createLogic({
    type:editNameTypes.EDIT_NAME,
    latest:true,
    debounce:1000,

    process({
        action
    },dispatch,done){
        let HTTPclient=api

        // debugger
        console.log("payload check",action.payload)

        let obj={
            id:action.payload.articleId,
            articleName:action.payload.editedName
        }

        HTTPclient.post(endPoints.EDIT_NAME,obj)
            .then(resp=> {
                // debugger
                console.log(resp.data)
                dispatch(editNameActions.editNameSuccess(resp.data))
            })
            .catch(err=>{
                var errormsg="Failed to edit Article name";
                if (err && err.code === "ECONNABORTED") {
                    errormsg = "Please check your internet connection.";
                }
                dispatch(editNameActions.editNameFail(errormsg))
            }).then(()=>done());
    }
})

const deletearticle = createLogic({
    type: deleteArticleTypes.DELETE_ARTICLE,
    latest: true,
    debounce: 1000,

    process({
        action
    }, dispatch, done) {
        let HTTPclient = api

        // debugger
        console.log("payload check", action.payload)
        let articleId=action.payload

        HTTPclient.post(endPoints.DELETE_ARTICLE+articleId)
            .then(resp => {
                //debugger
                console.log(resp.data)
                dispatch(deleteArticleActions.deleteArticleSuccess(resp.data))
            })
            .catch(err => {
                var errormsg = "Failed to delete Article";
                if (err && err.code === "ECONNABORTED") {
                    errormsg = "Please check your internet connection.";
                }
                dispatch(deleteArticleActions.deleteArticleFail(errormsg))
            }).then(() => done());
    }
})

const gethtml=createLogic({
    type:getHtmlTypes.GET_HTML_TEXT,
    latest:true,
    debounce:1000,

    process({
        action
    },dispatch,done){
        let HTTPclient=api

        // debugger
        console.log("payload check",action.payload)

        HTTPclient.get(endPoints.GET_HTML+action.payload)
            .then(resp=> {
                // debugger
                console.log(resp.data)
                dispatch(getHtmlActions.getHTMLTextSuccess(resp.data))
            })
            .catch(err=>{
                var errormsg="Failed to get Articles";
                if (err && err.code === "ECONNABORTED") {
                    errormsg = "Please check your internet connection.";
                }
                dispatch(getHtmlActions.getHTMLTextFail(errormsg))
            }).then(()=>done());
    }
})

const searcharticle=createLogic({
    type:searchArticleTypes.SEARCH_ARTICLE,
    latest:true,
    debounce:1000,

    process({
        action
    },dispatch,done){
        let HTTPclient=api

        // debugger
        console.log("payload check",action.payload)

        HTTPclient.get(endPoints.SEARCH_ARTICLE+action.payload)
            .then(resp=> {
                // debugger
                console.log(resp.data)
                dispatch(searchArticleActions.searchArticleSuccess(resp.data))
            })
            .catch(err=>{
                var errormsg="Failed to get Articles";
                if (err && err.code === "ECONNABORTED") {
                    errormsg = "Please check your internet connection.";
                }
                dispatch(searchArticleActions.searchArticleFail(errormsg))
            }).then(()=>done());
    }
})

export default [
    savearticle,
    downloadarticle,
    getarticles,
    editarticle,
    gethtml,
    editarticlename,
    deletearticle,
    searcharticle
]