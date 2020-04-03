import { combineReducers } from "redux"
import login from './login'
import lmResult from './lmResult'
import article from './article'

const rootReducer=combineReducers({
    Login:login,
    LMResult:lmResult,
    Article:article,
    
})

export default rootReducer;