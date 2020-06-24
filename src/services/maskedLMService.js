import {createLogic} from 'redux-logic'

import {lmResultTypes,lmResultActions,getGeneratedArticleActions,getGeneratedArticleTypes} from "../actions"

import * as endPoints from './endpoints'
import * as api from './HTTPclient'

const maskedlm=createLogic({
    type:lmResultTypes.LM_RESULT,
    latest:true,
    debounce:1000,

    process({
        action
    },dispatch,done){
        let HTTPclient=api

        // debugger
        console.log("payload check",action.payload)

        let obj={
            length :action.payload.length,
            temperature:action.payload.temperature,
            noOfSamples :action.payload.samples,
            articleDetails:action.payload.details,
        }

        HTTPclient.post(endPoints.MASKED_LM_RESULT,obj)
            .then(resp=> {
                // debugger
                console.log(resp.data)
                dispatch(lmResultActions.lmResultSuccess(resp.data))
            })
            .catch(err=>{
                var errormsg="Failed to get masked language modeling result";
                if (err && err.code === "ECONNABORTED") {
                    errormsg = "Please check your internet connection.";
                }
                dispatch(lmResultActions.lmResultFail(errormsg))
            }).then(()=>done());
    }
})

const getGenerated=createLogic({
    type:getGeneratedArticleTypes.GET_GENERATED_ARTICLES,
    latest:true,
    debounce:1000,

    process({
        action
    },dispatch,done){
        let HTTPclient=api

        // debugger
        console.log("payload check",action.payload)

        let obj={
            length :action.payload.length,
            temperature:action.payload.temperature,
            noOfSamples:action.payload.samples,
            articleDetails:action.payload.details,
        }

        HTTPclient.post(endPoints.GENERATE_ARTICLE,obj)
            .then(resp=> {
                // debugger
                console.log(resp.data)
                dispatch(getGeneratedArticleActions.getGeneratedArticlesSuccess(resp.data))
            })
            .catch(err=>{
                var errormsg="Failed to get masked language modeling result";
                if (err && err.code === "ECONNABORTED") {
                    errormsg = "Please check your internet connection.";
                }
                dispatch(getGeneratedArticleActions.getGeneratedArticlesFail(errormsg))
            }).then(()=>done());
    }
})

export default [
    maskedlm,
    getGenerated
]