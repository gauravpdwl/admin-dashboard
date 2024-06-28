import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store";

const Nonauth = () => {
  const location=useLocation();
    const {user} =useAuthStore()

    if(user !== null){
      // here we are passing search query to URLSearchParams and it returns a object 
      // from which we are getting 'returnTo' value
      const returnTo=new URLSearchParams(location.search).get('returnTo') || '/';
        return <Navigate to={returnTo} replace={true} />
    }


  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Nonauth;