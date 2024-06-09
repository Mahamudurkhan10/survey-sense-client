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
import Update from "../Pages/DashBorad/Surveyor/Update";
import Login from "../Pages/Home/Login/Login";
import SingUp from "../Pages/Home/SinUp/SingUp";
import AllUsers from "../Pages/DashBorad/Admin/AllUsers";
import Report from "../Pages/DashBorad/User/Report";
import ResponseDetails from "../Pages/DashBorad/Surveyor/ResponseDetails";
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
        },
        {
          path:'/login',
          element: <Login></Login>

        },
        {
          path:'/singUp',
          element: <SingUp></SingUp>
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
        },
        {
          path:'update/:id',
          element: <Update></Update>,
          loader:({params})=> fetch(`http://localhost:5000/survey/${params.id}`)
        },
        {
          path:'responseDetails/:id',
          element: <ResponseDetails></ResponseDetails>,
          loader:({params}) => fetch(`http://localhost:5000/responseOne/${params.id}`)
        },
        // Admin
        {
          path:'allUsers',
          element: <AllUsers></AllUsers>
        },
        // User 
        {
          path:'userReport',
          element: <Report></Report>
        }
      ]
     }
   ]);

