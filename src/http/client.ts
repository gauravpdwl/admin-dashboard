import axios from "axios";
import { useAuthStore } from "../store";

export const api=axios.create({
    baseURL:"http://localhost:8000/",
    withCredentials:true,
    headers:{
        // we will send data in json format
        'Content-Type':'application/json',
        // telling backend that client will receive data in json format
        Accept:'application/json'
    }
})

// const refreshToken=()=>api.get('auth/refresh');

const refreshToken=async ()=>{
    await axios.post(`http://localhost:8000/api/auth/auth/refresh`, 
        // body
        {},
        {
        withCredentials:true
    })
}

api.interceptors.response.use((response)=>response, async (error)=>{

    const originalrequest=error.config;

    if(error.response.status === 401 && !originalrequest._isRetry){
        try{
            originalrequest._isRetry=true;
            const headers={...originalrequest.headers};
            await refreshToken();
            return api.request({...originalrequest, headers})
        }catch(err){
            console.error("Token refresh error, ",err);
            useAuthStore.getState().logout();
            return Promise.reject(err);
        }
    }

    return Promise.reject(error);
});