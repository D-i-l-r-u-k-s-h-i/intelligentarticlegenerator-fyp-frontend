import axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'

// const id_token="JWTSuperSecretKey";

// axios.defaults.headers.post["Content-Type"] = 'application/json'
axios.defaults.headers.get["Content-Type"] = 'application/json'

var instance = null;
// const progressBarConfig = {speed: 500,trickleRate: 0.02, trickleSpeed: 800}; //, showSpinner: false 

export const setAuth = () => {
    if(localStorage.jwt==undefined){
        // debugger
        instance = axios.create({
            baseURL: '',
            timeout: 30000,
    
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        instance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response.status === 401) {
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                // window.location = '/'
                console.log(error.response.data.message)
                let obj={data:error.response.data.message}
                return obj
            }
            else {
                return Promise.reject(error);
            }
        });
    }
    else{
        // debugger
        instance = axios.create({
            baseURL: '',
            timeout: 12000000,
    
            headers: {
                'Authorization': 'Bearer ' + localStorage.jwt,
                'Content-Type': 'application/json'
            }
        }
        )
        loadProgressBar(null,instance)
        instance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response.status === 401) {
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                // window.location = '/'
                console.log(error.response.data.message)
                let obj={data:error.response.data.message}
                return obj
            }
            else {
                return Promise.reject(error);
            }
        });
    }
    
}

export const post=(route,data)=>{
    instance || setAuth()
    return instance.post(route,data == null ? { data: {} } :  data= JSON.stringify(data))
}

export const postPDF=(route,imgdata,responseType='arraybuffer')=>{
    instance || setAuth()
    return instance.post(route,imgdata,responseType)
}

export const get = (route, data) => {
    instance || setAuth()
    return instance.get(route, data == null ? { data: {} } : { data: JSON.stringify(data) })
}