import {lmResultTypes} from '../actions'

import {handleActions} from "redux-actions"

const initialState={
    lmData:null
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
},initialState)