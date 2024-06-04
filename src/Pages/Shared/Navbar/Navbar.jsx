import { NavLink } from "react-router-dom";


const Navbar = () => {
     const user =true;
     const navItem = <>
       <li> <NavLink to={'/'}><a> Home</a></NavLink> </li>
       <li> <NavLink to={'/survey'}><a> Survey </a></NavLink> </li>
       <li> <NavLink to={'/pricing'}><a> Pricing </a></NavLink> </li>
     </>
     const navItem2 = <>
       
       <li> <NavLink className={'btn btn-ghost'}  to={'/dashboard'}><a> Dashboard </a></NavLink> </li>
       <li> <button className="btn btn-ghost">  <a> Logout </a></button> </li>
     </>
     return (
          <div >
               <div className="navbar  max-w-screen-xl fixed z-10">
                    <div className="flex-1">
                         <a className="btn btn-ghost text-xl"> Survey Sense </a>
                    </div>
                    <div className="flex-1 justify-end">
                         <div className="dropdown dropdown-end">
                           <ul className="flex gap-12 mr-6">  {navItem}</ul>
                             
                         </div>
                         <div className="dropdown dropdown-end">
                              {
                                   user? <div><div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                   <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                   </div>
                              </div>
                              <ul tabIndex={0} className="menu space-y-3  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                   
                                       {navItem2}
                              </ul> </div>
                              : <button className="btn btn-success text-white font-bold"> Join Us </button>

                              }
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Navbar;