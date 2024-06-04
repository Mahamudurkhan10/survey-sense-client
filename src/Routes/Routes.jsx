import {
     createBrowserRouter,
 
   } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Layout/Dashboard";

import SurveyCardDetails from "../Pages/Shared/SurveyCard/SurveyCardDetails";
 export  const router = createBrowserRouter([
     {
       path: "/",
       element: <Root></Root>,
       children:[
        {
          path:'/',
          element: <Home></Home>
        },{
          path:'/surveyDetails/:id',
          element: <SurveyCardDetails></SurveyCardDetails>,
          loader: ({params})=> fetch(`http://localhost:5000/surveyDetail/${params.id}`)
        }
       ]
     },
     {
      path:'dashboard',
      element: <Dashboard></Dashboard>,
      children:[
        {}
      ]
     }
   ]);

