import { BiUpvote } from "react-icons/bi";
import { FaThumbsUp } from "react-icons/fa";

import { NavLink } from "react-router-dom";


const  MostSurveyCard = ({survey}) => {
     const { title,
          _id,
          description,
          category,
          deadline_date,
          options,
          status,
          timestamp,
          vote } = survey;
     return (
          <div className="mt-7 mb-5 p-4 lg:p-0">
               <article className="rounded-xl  lg:h-[320px]  bg-blue-50 p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
                    <div className="flex lg:items-start  flex-row-reverse lg:flex-row sm:gap-8">
                   
                    <NavLink  to={`/surveyDetails/${_id}`}>
                    <div
                              className=" btn grid size-20 shrink-0 place-content-center rounded-full border-2 border-indigo-500"
                              aria-hidden="true"
                         >          <h1 className="text-amber-700 text-sm font-bold"> vote</h1>
                                   <h1 className="flex items-center gap-2">  <BiUpvote className="text-xl text-blue-600"></BiUpvote> <span className="text-orange-400 font-bold">{vote}</span> </h1>
                           

                         </div>
                   
                    </NavLink>

                         <div className="">
                              <strong
                                   className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
                              >
                                   Creation date : {timestamp.toString().split("T")[0]}
                              </strong>

                              <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                   <a href="#" className="hover:underline">  </a>
                              </h3>

                              <p className="mt-1 text-sm text-gray-700">
                                  {description}
                              </p>

                              <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                                   <div className="flex items-center gap-1 text-gray-500">
                                        <svg
                                             className="h-4 w-4"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg"
                                        >
                                             <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                             ></path>
                                        </svg>

                                        <p className="text-xs font-extrabold" > Deadline date : {deadline_date} </p>
                                   </div>

                              </div>
                              <div className="divider divider-success"></div>
                              <div className="flex gap-2 lg:flex-row text-lg font-bold"> 
                                   <h1 > Category : <span className="text-xs font-medium text-yellow-700">{category}</span> </h1>
                                   <h1> Title : <span className="text-xs font-medium text-blue-500">{title}</span></h1>
                              </div>
                              
                         <div className=" mt-3 ">
                         <NavLink to={`/surveyDetails/${_id}`}>   <button className="btn  btn-outline  btn-info font-bold "> View Details </button>  </NavLink>

                         </div>
                         </div>
                    </div>
               </article>
          </div>
     );
};

export default MostSurveyCard;