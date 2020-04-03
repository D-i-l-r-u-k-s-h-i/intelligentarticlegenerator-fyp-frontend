import {createLogic} from 'redux-logic'
import history from '../history'
import {loginActions,loginTypes} from "../actions"
import jwtDecode from 'jwt-decode';
import * as endPoints from './endpoints'
import * as api from './HTTPclient'

const login=createLogic({
    type:loginTypes.LOGIN,
    latest:true,
    debounce:1000,

    process({
        action
    },dispatch,done){
        let HTTPclient=api

        // debugger
        console.log("payload check",action.payload)

        let obj={
            username : action.payload.uname,
            password : action.payload.pass,
        }

        HTTPclient.post(endPoints.LOGIN,obj)
            .then(resp=> {
                // debugger
                dispatch(loginActions.loginSuccess(resp.data))
                return(resp.data)
            })
            .then(data => {
                localStorage.setItem('jwt', data.accessToken);
                var decodedToken = jwtDecode(data.accessToken);

                var user=decodedToken.username
                var roleId=decodedToken.role.roleId

                localStorage.setItem('user', user);
                localStorage.setItem('roleId',roleId)
                
                // Set token for subsequent calls
                api.setAuth(); 

                //check for roleId and direct user to the respective page
                if(roleId===1){
                    history.push('/admin');
                }
                else if(roleId===2){
                    history.push('/home');
                }
                
                return data
            })
            .catch(err=>{
                var errormsg="Failed to login";
                if (err && err.code === "ECONNABORTED") {
                    errormsg = "Please check your internet connection.";
                }
                dispatch(loginActions.loginFail(errormsg))
            }).then(()=>done());
        
    }
})

export default [
    login,
]