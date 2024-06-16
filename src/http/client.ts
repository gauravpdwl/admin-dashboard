import axios from "axios";

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

