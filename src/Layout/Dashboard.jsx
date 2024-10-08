import { FaAd, FaBook, FaCalendar, FaChartBar, FaEnvelope, FaHome, FaList, FaSearch, FaUsers, FaUtensils } from "react-icons/fa";
import { FcSurvey } from "react-icons/fc";

import { RiArrowUpDownFill } from "react-icons/ri";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { MdPayment, MdReportProblem } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { Helmet } from "react-helmet";


const Dashboard = () => {
     const { user,logOut } = useAuth()
     const axiosPublic = useAxiosPublic()
     const navigate = useNavigate()
     const location = useLocation()
     const form = location.state?.form?.pathname || "/";
     const LogOut2 = () => {
          logOut()
          navigate(form,{replace:true})
     }
     const { data: validUser, isPending: loading } = useQuery({
          queryKey: ['validUser', user?.email],
          queryFn: async () => {
               const res = await axiosPublic.get(`/users/${user?.email}`)


               return res.data;
          }
     })

     const renderNavLinks = () => {
          switch (validUser?.role) {
               case 'admin':
                    return (
                         <div className="flex flex-col gap-5 lg:text-lg font-semibold text-blue-600">
                              <li className="text-center text-3xl text-emerald-600 font-bold uppercase"> Admin Home </li>
                              <li> <NavLink to="/dashboard/allUsers"> <FaUsers /> All Users </NavLink> </li>
                              <li> <NavLink to="/dashboard/publishedSurvey"> <FaUsers /> Publish-UnPublish </NavLink> </li>
                              <li> <NavLink to="/dashboard/responseSurvey"> <FaUsers /> Responses Survey </NavLink> </li>
                              <li> <NavLink to="/dashboard/payment"> <MdPayment /> All Payments </NavLink> </li>
                         </div>
                    );
               case 'surveyor':
                    return (
                         <>
                              <li className="text-center text-2xl text-blue-900 font-bold"> Surveyor Home </li>
                              <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/surveyorChart"> <FaChartBar /> SurveyChart </NavLink> </li>
                              <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/createSurvey"> <FcSurvey /> Create Survey </NavLink> </li>
                              <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/allSurvey"> <RiArrowUpDownFill /> Update Survey </NavLink> </li>
                              <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/surveyResponse"> <FaList /> Survey Response </NavLink> </li>
                              <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/feedBack"> <FaList /> FeedBack </NavLink> </li>
                         </>
                    );

               default:
                    return <>
                         <li className="text-center text-2xl text-blue-900 font-bold"> User Dashboard </li>
                         <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/userReport"> <MdReportProblem /> User Report </NavLink> </li>

                         <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/participateSurvey"> <MdReportProblem /> Participate Surveys </NavLink> </li>
                         {validUser?.role === 'proUser' && (
                              <li><NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/proUser"><MdReportProblem /> Comments </NavLink></li>
                         )}
                    </>;
          }
     };
     return (
          <div className="flex">
               <div>
               <Helmet>
                    <title> Dashboard </title>
               </Helmet>
               </div>
               <div className="w-64  min-h-screen bg-gray-200">
                    <ul className="menu p-4 space-y-4">

                         {renderNavLinks()}
                         <div className="divider"></div>

                         <li> <NavLink className="text-lg font-semibold text-green-600" to="/"> <FaHome /> Home </NavLink> </li>
                         <li> <button onClick={LogOut2} className="btn btn-success flex items-center"> <SlLogout></SlLogout>  <a> Logout </a></button> </li>
                    </ul>
               </div>
               <div className="flex-1">
                    <Outlet />
               </div>
          </div>
     );
};

export default Dashboard;