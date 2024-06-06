import {
     createBrowserRouter,
 
   } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Layout/Dashboard";

import SurveyCardDetails from "../Pages/Shared/SurveyCard/SurveyCardDetails";
import Survey from "../Pages/Survey/Survey";
import SurveyorHome from "../Pages/DashBorad/Surveyor/SurveyorHome";
import CreateSurvey from "../Pages/DashBorad/Surveyor/CreateSurvey";
import AllSurvey from "../Pages/DashBorad/Surveyor/AllSurvey";
import SurveyResponse from "../Pages/DashBorad/Surveyor/SurveyResponse";
 export  const router = createBrowserRouter([
     {
       path: "/",
       element: <Root></Root>,
       children:[
        {
          path:'/',
          element: <Home></Home>
        },
        {
          path:'/survey/:category',
          element: <Survey></Survey>
        },
        {
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
        // Surveyor
        {
          path:'surveyorHome',
          element: <SurveyorHome></SurveyorHome>
        },
        {
          path:'createSurvey',
          element:<CreateSurvey></CreateSurvey>
        },
        {
          path:'allSurvey',
          element:<AllSurvey></AllSurvey>

        },
        {
          path:'surveyResponse',
          element:<SurveyResponse></SurveyResponse>
        }
      ]
     }
   ]);

