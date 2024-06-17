import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { self } from "../http/api";
import { useAuthStore } from "../store";
import { useEffect } from "react";
import { AxiosError } from "axios";

const getSelf=async()=>{
    const output = await self();
    return output.data;
}

const Root = () => {
    //-------------------------------------------------------------------------
    // when we click on reload in browser the state of application is clearing
    // and we can see that user is set to null that's why we are getting redirected to 
    // login page even if we are still having cookies.

    // what happens here is when we reload it clears the state but useQuery is triggered 
    // wheneve reolaod happens and default value of enabled is true by default so useEffect
    // detects the change in data variable when it becomes undefined and then executes which 
    // prints undefined value first and when it changes again it prints the data of user.

    const {setUser}=useAuthStore();

    const {data, isLoading }=useQuery({
        queryKey:['self'],
        queryFn: getSelf,
        // enabled:false,
        retry: (failureCount:number, error)=>{
            if(error instanceof AxiosError && error.response?.status === 401){
                return false;
            }
            
            return failureCount <3; 
        }
    })
    
    useEffect(()=>{
        // console.log("Data - ",data);
        if(data){
            setUser(data);
        }
    },[data, setUser])
    
    if(isLoading){
        return <div>Loading...</div>
    }

  return (
    <Outlet/>
  )
}

export default Root;