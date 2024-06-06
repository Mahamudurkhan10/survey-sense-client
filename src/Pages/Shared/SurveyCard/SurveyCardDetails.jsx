import { FaComment, FaCommentDots, FaThumbsUp } from "react-icons/fa";
import { MdBugReport, MdOutlineBugReport, MdReport, MdReportOff, MdReportProblem } from "react-icons/md";
import { NavLink, useLoaderData } from "react-router-dom";


const SurveyCardDetails = () => {
     const survey = useLoaderData();
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
          <div className="pt-24" >
               <div className="text-center mb-7">
                    <h1 className="text-4xl text-blue-900 font-bold uppercase ">  Survey Card Details </h1>

               </div>

               <article className="rounded-xl w-3/4 mx-auto h-[360px] bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
                    <div className="sm:gap-8">



                         <div>
                              <div className="flex gap-6  mb-5 text-xl font-extrabold">
                                   <h1 > Category : <span className="text-lg font-medium text-yellow-700">{category}</span> </h1>
                                   <h1> Title : <span className="text-lg font-medium text-blue-500">{title}</span></h1>
                              </div>
                              <strong
                                   className="rounded  border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
                              >
                                   Creation date : {timestamp}
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
                              <div className="flex gap-24">
                                   <h1 className="text-lg font-bold text-blue-700"> Option: <span className="text-yellow-400 font-bold"> {options} </span> </h1>
                                   <h1 className="text-lg font-bold text-blue-700"> Status: <span className="text-orange-600 font-bold"> {status} </span> </h1>
                              </div>
                              <div className="divider divider-success"></div>


                              <div className=" mt-3 ">

                              </div>
                         </div>
                         <div className="flex justify-around ">

                              {/* Open the modal using document.getElementById('ID').showModal() method */}
                              <button onClick={() => document.getElementById('my_modal_1').showModal()}><div
                                   className="hidden btn sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
                                   aria-hidden="true"
                              >
                                   <h1 className="flex items-center gap-2">  <FaThumbsUp className="text-xl "></FaThumbsUp> <span className="text-green-900 font-bold">{vote}</span> </h1>


                              </div></button> 
                              <dialog id="my_modal_1" className="modal">
                                   <div className="modal-box">
                                          <form action="">
                                             
                                          </form>
                                        <div className="modal-action">
                                             <form method="dialog">
                                                  
                                                  <button className="btn">Close</button>
                                             </form>
                                        </div>
                                   </div>
                              </dialog>
                              <div
                                   className="hidden btn sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-black"
                                   aria-hidden="true"
                              >
                                   <h1 className="flex items-center gap-2">  <FaCommentDots className="text-xl text-black"></FaCommentDots> <span className="text-green-900 font-bold"></span> </h1>


                              </div>
                              <div
                                   className="hidden btn sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-red-500"
                                   aria-hidden="true"
                              >
                                   <h1 className="flex items-center gap-2">  <MdReportProblem className="text-2xl text-red-600"></MdReportProblem> <span className="text-green-900 font-bold"></span> </h1>


                              </div>

                         </div>
                    </div>
               </article>
          </div>
     );
};

export default SurveyCardDetails;