import { FaThumbsUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const SurveyTab = ({ survey }) => {
console.log(survey);
     return (
          <div>
               <h1 className="mb-5 text-center text-3xl font-bold text-green-700"> {survey.slice(0,1).map(c => <> {c.category} Surveys </>)} </h1>
             <div className="grid  grid-cols-1 gap-7 lg:grid-cols-2">
               {survey.map(card => <div key={card._id}>
                    <article className="rounded-xl   bg-gray-200 p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
                    <div className="flex items-start  sm:gap-8">
                   
                     <div
                              className="hidden btn sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
                              aria-hidden="true"
                         >
                                   <h1 className="flex items-center gap-2">  <FaThumbsUp className="text-xl text-green-700 "></FaThumbsUp> <span className="text-orange-400 font-bold">{card.vote}</span> </h1>
                           

                         </div>
                   

                         <div>
                              <strong
                                   className="rounded border border-indigo-500 bg-yellow-900 px-3 py-1.5 text-[10px] font-medium text-white"
                              >
                                   Creation date : {card.timestamp}
                              </strong>

                              <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                   <a href="#" className="hover:underline">  </a>
                              </h3>

                              <p className="mt-1 text-sm text-gray-700">
                                  {card.description}
                              </p>

                              <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                                  

                              </div>
                           
                              <div className="flex gap-2 text-2xl text-yellow-500 font-bold"> 
                                  
                                   <h1 > Title : <span className="text-xl font-medium text-emerald-500">{card.title}</span></h1>
                              </div>
                              
                         <div className=" mt-3 ">
                         <NavLink to={`/surveyDetails/${card._id}`}>   <button className="btn  btn-outline  btn-success font-bold "> View Details </button>  </NavLink>

                         </div>
                         </div>
                    </div>
               </article>
               </div> )}
               </div>   
          </div>
     );
};

export default SurveyTab;