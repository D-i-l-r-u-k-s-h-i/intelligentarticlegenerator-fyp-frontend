import { combineReducers } from "redux"
import login from './login'
import lmResult from './lmResult'
import article from './article'
import signup from './signup'

const rootReducer=combineReducers({
    Login:login,
    LMResult:lmResult,
    Article:article,
    SignUp:signup
})

export default rootReducer;