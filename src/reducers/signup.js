import {signUpTypes} from '../actions'

import {handleActions} from "redux-actions"

const initialState={
    SignUpData:null
}

export default handleActions({
    [signUpTypes.SIGN_UP]:(state,{payload})=>({
        ...state,loading:true
    }),
    [signUpTypes.SUCCESS_SIGN_UP]:(state,{payload})=>({
        ...state,loading:false,SignUpData:payload
    }),
    [signUpTypes.FAIL_SIGN_UP]:(state,{payload})=>({
        ...state,loading:false,SignUpData:null
    }),
},initialState)