import {
     createBrowserRouter,
 
   } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Layout/Dashboard";

import SurveyCardDetails from "../Pages/Shared/SurveyCard/SurveyCardDetails";
import Survey from "../Pages/Survey/Survey";
import SurveyorHome from "../Pages/DashBorad/Surveyor/SurveyorChart";
import CreateSurvey from "../Pages/DashBorad/Surveyor/CreateSurvey";
import AllSurvey from "../Pages/DashBorad/Surveyor/AllSurvey";
import SurveyResponse from "../Pages/DashBorad/Surveyor/SurveyResponse";
import Update from "../Pages/DashBorad/Surveyor/Update";
import Login from "../Pages/Home/Login/Login";
import SingUp from "../Pages/Home/SinUp/SingUp";
import AllUsers from "../Pages/DashBorad/Admin/AllUsers";
import Report from "../Pages/DashBorad/User/Report";
import ResponseDetails from "../Pages/DashBorad/Surveyor/ResponseDetails";
import StatusSurvey from "../Pages/DashBorad/Admin/StatusSurvey";
import ResponseSurvey from "../Pages/DashBorad/Admin/ResponseSurvey";
import ParticipateSurvey from "../Pages/DashBorad/User/ParticipateSurvey";
import Pricing from "../Pages/Pricing/Pricing";
import Payment from "../Pages/Pricing/Payment";
import Comments from "../Pages/DashBorad/User/Comments";
import SurveyorChart from "../Pages/DashBorad/Surveyor/SurveyorChart";
import FeedBack from "../Pages/DashBorad/Surveyor/FeedBack";
import AllPayments from "../Pages/DashBorad/Admin/AllPayments";
import PrivateRoutes from "./PrivateRoutes";
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
          element: <PrivateRoutes><SurveyCardDetails></SurveyCardDetails></PrivateRoutes>,
          loader: ({params})=> fetch(`http://localhost:5000/surveyDetail/${params.id}`)
        },
        {
          path:'/login',
          element: <Login></Login>

        },
        {
          path:'/singUp',
          element: <SingUp></SingUp>
        },
        {
          path:'pricing',
          element: <PrivateRoutes><Pricing></Pricing></PrivateRoutes>,

        },
        {
          path:'payment',
          element: <Payment></Payment>
        }
       ]
     },
     {
      path:'dashboard',
      element: <Dashboard></Dashboard>,
      children:[
        // Surveyor
        {
          path:'surveyorChart',
          element:<SurveyorChart></SurveyorChart>
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
        {
          path:'feedBack',
          element: <FeedBack></FeedBack>
        },
        // Admin
        {
          path:'allUsers',
          element: <AllUsers></AllUsers>
        },
        {
          path:'publishedSurvey',
          element: <StatusSurvey></StatusSurvey>
        },
        {
          path:'responseSurvey',
          element: <ResponseSurvey></ResponseSurvey>
        },{
          path:'payment',
          element: <AllPayments></AllPayments>
        },
        // User 
        {
          path:'userReport',
          element: <Report></Report>
        },
        {
          path: 'participateSurvey',
          element: <ParticipateSurvey> </ParticipateSurvey>
        },
        {
          path: 'proUser',
          element: <Comments></Comments>
        }
        
      ]
     }
   ]);

