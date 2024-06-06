import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaUsers, FaUtensils } from "react-icons/fa";
import { FcSurvey } from "react-icons/fc";
import { MdOutlineAddShoppingCart, MdUpdate, MdUpdateDisabled } from "react-icons/md";
import { RiArrowUpDownFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
     const ne = false;
     const isAdmin = false;
     const surveyor = true;
     const proUser = false;
     const user = surveyor;
     return (
          <div className="flex">
               <div className="w-64 min-h-screen bg-gray-200">
                    <ul className="menu p-4 space-y-4">
                         {
                            user === isAdmin? <>
                                   <li> <NavLink to={'/dashboard/adminHome'}> <FaHome></FaHome> Admin Home </NavLink> </li>
                                   <li> <NavLink > <FaUtensils></FaUtensils> Add Items </NavLink> </li>
                                   <li> <NavLink  > <FaList></FaList> Manage Items </NavLink> </li>
                                   <li> <NavLink > <FaBook></FaBook> Manage  Bookings </NavLink> </li>
                                   <li> <NavLink > <FaUsers></FaUsers> All Users </NavLink> </li>

                              </> : user === surveyor? <>
                                     <li className="text-center text-2xl text-blue-900 font-bold"> Surveyor </li>
                                   <li> <NavLink className={'text-yellow-700 text-lg font-semibold'} to={'/dashboard/surveyorHome'} > <FaHome></FaHome> surveyor Home </NavLink> </li>
                                   <li> <NavLink className={'text-yellow-700 text-lg font-semibold'} to={'/dashboard/createSurvey'}  > <FcSurvey></FcSurvey>  Create Survey  </NavLink> </li>
                                   <li> <NavLink className={'text-yellow-700 text-lg font-semibold'} to={'/dashboard/allSurvey'}> <RiArrowUpDownFill></RiArrowUpDownFill>  Update Survey  </NavLink> </li>
                                   <li> <NavLink className={'text-yellow-700 text-lg font-semibold'} to={'/dashboard/surveyResponse'}> <FaList></FaList>  Survey response  </NavLink> </li>
                                   
                              </>: user === proUser?<>
                                <li> proUser Home </li>
                              </>:<>
                               <li> User Home </li>
                              </>
                         }
                         <div className="divider"></div>
                         {/* shared  */}
                         <li> <NavLink className={'text-lg font-semibold text-green-600'} to={'/'}> <FaHome></FaHome>   Home </NavLink> </li>
                        
                    </ul>
               </div>
               <div className="flex-1">
                    <Outlet></Outlet>
               </div>
          </div>
     );
};

export default Dashboard;