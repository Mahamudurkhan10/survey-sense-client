import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaUsers, FaUtensils } from "react-icons/fa";
import { FcSurvey } from "react-icons/fc";

import { RiArrowUpDownFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { MdReportProblem } from "react-icons/md";


const Dashboard = () => {
     const { user } = useAuth()
     const axiosPublic = useAxiosPublic()
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
                         <>
                              <li> <NavLink to="/dashboard/adminHome"> <FaHome /> Admin Home </NavLink> </li>
                              <li> <NavLink to="/dashboard/allUsers"> <FaUsers /> All Users </NavLink> </li>
                              <li> <NavLink to="/dashboard/publishedSurvey"> <FaUsers /> Publish-UnPublish </NavLink> </li>
                              <li> <NavLink to="/dashboard/responseSurvey"> <FaUsers /> Responses Survey </NavLink> </li>
                         </>
                    );
               case 'surveyor':
                    return (
                         <>
                              <li className="text-center text-2xl text-blue-900 font-bold"> Surveyor </li>
                              <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/surveyorHome"> <FaHome /> Surveyor Home </NavLink> </li>
                              <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/createSurvey"> <FcSurvey /> Create Survey </NavLink> </li>
                              <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/allSurvey"> <RiArrowUpDownFill /> Update Survey </NavLink> </li>
                              <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/surveyResponse"> <FaList /> Survey Response </NavLink> </li>
                         </>
                    );
               case 'proUser':
                    return <li> ProUser Home </li>;
               default:
                    return <>
                         <li className="text-center text-2xl text-blue-900 font-bold"> User Dashboard </li>
                         <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/userReport"> <MdReportProblem /> User Report </NavLink> </li>
                         <li> <NavLink className="text-yellow-700 text-lg font-semibold" to="/dashboard/participateSurvey"> <MdReportProblem /> Participate Surveys </NavLink> </li>
                    </>;
          }
     };
     return (
          <div className="flex">
               <div className="w-64 min-h-screen bg-gray-200">
                    <ul className="menu p-4 space-y-4">

                         {renderNavLinks()}
                         <div className="divider"></div>

                         <li> <NavLink className="text-lg font-semibold text-green-600" to="/"> <FaHome /> Home </NavLink> </li>
                    </ul>
               </div>
               <div className="flex-1">
                    <Outlet />
               </div>
          </div>
     );
};

export default Dashboard;