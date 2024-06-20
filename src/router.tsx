import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/login/login";
import Dashboard from "./layouts/dashboard";
import Nonauth from "./layouts/nonauth";
import Root from "./layouts/root";
import Users from "./pages/users/users";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Root/>,
        children:[
            {
                path:'/',
                element:<Dashboard/>,
                children:[
                    {
                        path:'/',
                        element:<HomePage/>
                    },
                    {
                        path:'/users',
                        element:<Users/>
                    },
                    {
                        path:'/restaurants',
                        element:<Users/>
                    },
                    {
                        path:'/products',
                        element:<Users/>
                    },
                    {
                        path:'/promos',
                        element:<Users/>
                    }, 
                ]
            },
            {
                path:'/auth',
                element:<Nonauth/>,
                children:[
                    {
                        path:'login',
                        element:<LoginPage/>
                    }
                ]
            },
        ]
    },
])

