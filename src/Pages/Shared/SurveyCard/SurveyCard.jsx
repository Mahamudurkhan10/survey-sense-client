import { FaThumbsUp, FaVoteYea } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const SurveyCard = ({ survey }) => {
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
          <div className="mt-6">


               <article
                    className=" h-[310px]  rounded-xl  shadow-sm hover:shadow-2xl "
               >
                    <div className="rounded-[10px]  p-4 !pt-05 sm:p-6">
                          <div className="flex gap-7">
                          <h1 className="text-xl font-bold text-blue-500"> {category} </h1>
                          <h1 className="flex gap-2 rounded-full  items-center btn "> <FaThumbsUp className="text-lg "></FaThumbsUp> {vote} </h1>
                          </div>
                         <h1 className="text-lg  font-bold"> <span className="text-xl text-green-500">Title :</span> {title} </h1>
                         <a >
                              <h3 className="mt-0.5 text-sm font-medium text-gray-900">
                                 {description}
                              </h3>
                         </a>

                         <div className="mt-4 flex flex-wrap gap-1">
                              <span
                                   className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
                              >
                                  Creation date : {timestamp}
                              </span>

                              <span
                                   className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
                              >
                                   Deadline date : {deadline_date}
                              </span>
                         </div>
                         
                         <div className=" mt-4">
                         <NavLink to={`/surveyDetails/${_id}`}><button className="btn  btn-outline w-full btn-info font-bold "> View Details </button></NavLink>

                         </div>
                    </div>
                  
               </article>
          </div>
     );
};

export default SurveyCard;