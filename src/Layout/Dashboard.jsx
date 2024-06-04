import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaUsers, FaUtensils } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
     const ne = false;
     const isAdmin = false;
     const surveyor = true;
     const proUser = false;
     const user = surveyor;
     return (
          <div className="flex">
               <div className="w-64 min-h-screen bg-blue-500">
                    <ul className="menu p-4 space-y-4">
                         {
                            user === isAdmin? <>
                                   <li> <NavLink to={'/dashboard/adminHome'}> <FaHome></FaHome> Admin Home </NavLink> </li>
                                   <li> <NavLink > <FaUtensils></FaUtensils> Add Items </NavLink> </li>
                                   <li> <NavLink > <FaList></FaList> Manage Items </NavLink> </li>
                                   <li> <NavLink > <FaBook></FaBook> Manage  Bookings </NavLink> </li>
                                   <li> <NavLink > <FaUsers></FaUsers> All Users </NavLink> </li>

                              </> : user === surveyor? <>
                                   <li> <NavLink > <FaHome></FaHome>  surveyor Home </NavLink> </li>
                                   <li> <NavLink > <MdOutlineAddShoppingCart></MdOutlineAddShoppingCart>  My Cart  </NavLink> </li>
                                   <li> <NavLink > <FaCalendar></FaCalendar>  Reservation </NavLink> </li>
                                   <li> <NavLink > <FaAd></FaAd> Add a  Review </NavLink> </li>
                                   <li> <NavLink > <FaList></FaList> My Booking </NavLink> </li>
                              </>: user === proUser?<>
                                <li> proUser Home </li>
                              </>:<>
                               <li> User Home </li>
                              </>
                         }
                         <div className="divider"></div>
                         {/* shared  */}
                         <li> <NavLink to={'/'}> <FaHome></FaHome>   Home </NavLink> </li>
                         <li> <NavLink > <FaSearch></FaSearch> Menu</NavLink> </li>
                         <li> <NavLink > <FaEnvelope></FaEnvelope> Contact</NavLink> </li>
                    </ul>
               </div>
               <div className="flex-1">
                    <Outlet></Outlet>
               </div>
          </div>
     );
};

export default Dashboard;