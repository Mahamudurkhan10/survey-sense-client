import { NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

import { LuLogIn, } from "react-icons/lu";

import { SlLogout } from "react-icons/sl";


const Navbar = () => {
     const { user, logOut } = useAuth()
     const LogOut3 = () => {
          logOut()
     }
     const navItem = <>
          <li> <NavLink to={'/'}><a> Home</a></NavLink> </li>
          <li> <NavLink to={'/survey/Employee Engagement'}><a> Survey </a></NavLink> </li>
          <li> <NavLink to={'/pricing'}><a> Pricing </a></NavLink> </li>
     </>
     const navItem2 = <>

          <li> <NavLink className={'btn btn-ghost'} to={'/dashboard'}><a> Dashboard </a></NavLink> </li>
          <li> <button onClick={LogOut3} className="btn btn-ghost flex items-center"> <SlLogout></SlLogout> <a>  Logout </a></button> </li>
     </>
     return (
          <div >
               <div className="navbar  bg-gray-900 text-lg font-semibold text-blue-300 opacity-90 max-w-screen-xl fixed z-10">
               <div className="navbar-start">
                              <div className="dropdown ">
                                   <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                   </div>
                                   <ul tabIndex={0} className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-green-900 text-yellow-700 text-lg font-bold rounded-box w-52">
                                      {navItem}
                                   </ul>
                              </div>
                              <NavLink className={'flex'} to={'/'}><a className="btn btn-ghost text-xl text-green-400 ">Survey <span className="text-blue-600">Sense</span></a></NavLink>
                         </div>
                         <div className="navbar-center  hidden lg:flex">
                              <ul className="menu menu-horizontal px-1">
                                  {navItem}
                              </ul>
                         </div>
                    <div className="flex-1 justify-end">
                        
                         <div className="dropdown dropdown-end">
                              {
                                   user ? <div><div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                             <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                   </div>
                                        <ul tabIndex={0} className="menu space-y-3 text-black  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-300 rounded-box w-52">

                                             {navItem2}
                                        </ul> </div>
                                        : <NavLink to={'/login'}><button className="btn rounded-full btn-success uppercase text-white font-bold"> <LuLogIn></LuLogIn> Join Us </button></NavLink>

                              }
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Navbar;