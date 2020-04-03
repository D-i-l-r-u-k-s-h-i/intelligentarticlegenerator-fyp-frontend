import {loginTypes} from '../actions'

import {handleActions} from "redux-actions"

const initialState={
    loginData:null
}

export default handleActions({
    [loginTypes.LOGIN]:(state,{payload})=>({
        ...state,loading:true
    }),
    [loginTypes.SUCCESS_LOGIN]:(state,{payload})=>({
        ...state,loading:false,loginData:payload
    }),
    [loginTypes.FAIL_LOGIN]:(state,{payload})=>({
        ...state,loading:false,loginData:null
    }),
},initialState)