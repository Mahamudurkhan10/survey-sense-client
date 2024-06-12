import { FaComment, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import { NavLink, useLoaderData } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useRef, useState, useEffect } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";

const SurveyCardDetails = () => {
     const surveyLoaded = useLoaderData();
     const [survey, setSurvey] = useState(surveyLoaded);
     const { user } = useAuth();
     const axiosPublic = useAxiosPublic();
     const [reportDisable, setReportDisable] = useState(true);
     const [hasVoted, setHasVoted] = useState(false);
     const voteModalRef = useRef(null);
     const commentModalRef = useRef(null);

     const { refetch, data: oldUsers = [] } = useQuery({
          queryKey: ['oldUsers',user?.email],
          queryFn: async () => {
               const res = await axiosPublic.get(`/users/${user?.email}`);
               return res.data;
          }
     });
     console.log(oldUsers.role);
     const {
          title,
          _id,
          description,
          category,
          deadline_date,
          options,
          status,
          timestamp,
          vote, noVote, yesVote
     } = survey;

     const fetchData = () => {
          axiosPublic.get(`/survey/${_id}`)
               .then(res => {
                    setSurvey(res.data);
               });
     }

     const email = user?.email;
     const name = user?.displayName;
     const resId = _id;
     const response = { email, name, resId, title, category, vote, deadline_date, timestamp, yesVote, noVote, options, status };

     const handleVoteForm = (e) => {
          e.preventDefault();
          const newVote = e.target.vote.value;

          if (newVote === 'yes') {
               const yes = yesVote + 1;
               const vote = yes + noVote;

               const voteUpdate = { yes, vote };
               axiosPublic.patch(`/yesVoteUpdate/${_id}`, voteUpdate)
                    .then(res => {
                         if (res.data.modifiedCount > 0) {
                              fetchData();
                              Swal.fire({
                                   position: "top-end",
                                   icon: "success",
                                   title: `Survey vote is done`,
                                   showConfirmButton: false,
                                   timer: 1500
                              });
                              voteModalRef.current.close();
                              axiosPublic.post(`/response`, response)
                                   .then(res => {
                                        if (res.data.insertedId) {
                                             Swal.fire({
                                                  position: "top-start",
                                                  icon: "success",
                                                  title: `Survey vote is done`,
                                                  showConfirmButton: false,
                                                  timer: 1500
                                             });
                                        }
                                   });
                              setHasVoted(true);
                         }
                    });
          } else if (newVote === 'no') {
               const no = noVote + 1;
               const vote = no + yesVote;
               const voteUpdate = { no, vote };
               axiosPublic.patch(`/noVoteUpdate/${_id}`, voteUpdate)
                    .then(res => {
                         if (res.data.modifiedCount > 0) {
                              fetchData();
                              Swal.fire({
                                   position: "top-start",
                                   icon: "success",
                                   title: `Survey vote is done`,
                                   showConfirmButton: false,
                                   timer: 1500
                              });
                              voteModalRef.current.close();
                              axiosPublic.post(`/response`, response)
                                   .then(res => {
                                        if (res.data.insertedId) {
                                             Swal.fire({
                                                  position: "top-end",
                                                  icon: "success",
                                                  title: `Survey vote is done`,
                                                  showConfirmButton: false,
                                                  timer: 1500
                                             });
                                        }
                                   });
                              setHasVoted(true);
                         }
                    });
          }
     }

     const handleComment = (e) => {
          e.preventDefault();
          const comment = e.target.comment.value;
          const commentField = { comment, email, name, resId, title, category, status, deadline_date, vote };
          axiosPublic.post('/comments', commentField)
               .then(res => {
                    if (res.data.insertedId) {
                         Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Your comment has been saved",
                              showConfirmButton: false,
                              timer: 1500
                         });
                         e.target.reset();
                         commentModalRef.current.close();
                    }
               });
     }

     const handleReportForm = (e) => {
          e.preventDefault();
          const reportData = e.target.report.value;
          const report = { reportData, email, title, category, timestamp, deadline_date, surveyId: _id };
          axiosPublic.post('/report', report)
               .then(res => {
                    if (res.data.insertedId) {
                         setReportDisable(false);
                         Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: `Survey "${title}" has been reported`,
                              showConfirmButton: false,
                              timer: 1500
                         });
                    }
               });
     }

     return (
          <div className="pt-24">
               <div className="text-center mb-7">
                    <h1 className="text-4xl text-blue-900 font-bold uppercase">Survey Card Details</h1>
               </div>
               <article className="rounded-xl w-3/4 mx-auto lg:h-[360px] bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
                    <div className="sm:gap-8">
                         <div>
                              <div className="lg:flex gap-6 mb-5 text-xl font-extrabold">
                                   <h1>Category: <span className="text-lg font-medium text-yellow-700">{category}</span></h1>
                                   <h1>Title: <span className="text-lg font-medium text-blue-500">{title}</span></h1>
                              </div>
                              <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                                   Creation date: {timestamp}
                              </strong>
                              <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                   <a href="#" className="hover:underline"></a>
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
                                        <p className="text-xs font-extrabold">Deadline date: {deadline_date}</p>
                                   </div>
                              </div>
                              <div className="lg:flex gap-24">
                                   <h1 className="lg:text-lg font-bold text-blue-700">Option: <span className="text-yellow-400 font-bold">{options}</span></h1>
                                   <h1 className="lg:text-lg font-bold text-blue-700">Status: <span className="text-orange-600 font-bold">{status}</span></h1>
                              </div>
                              <div className="lg:flex gap-24">
                                   <h1 className="lg:text-lg font-bold flex items-center gap-2"><FaThumbsUp /> <span className="font-bold">{yesVote}</span></h1>
                                   <h1 className="lg:text-lg flex items-center gap-2 font-bold"><FaThumbsDown /> <span className="font-bold">{noVote}</span></h1>
                              </div>
                              <div className="divider divider-success"></div>
                              <div className="mt-3"></div>
                         </div>
                         <div className="flex justify-around">
                              {hasVoted ? (
                                   <button className="btn btn-disabled text-sm font-bold">Voted</button>
                              ) : (
                                   <button className="" onClick={() => document.getElementById('my_modal_5').showModal()}>
                                        <div className="btn grid size-20 shrink-0 place-content-center rounded-full border-2 border-indigo-500" aria-hidden="true">
                                             <h1 className="text-amber-700 text-sm font-bold">Vote</h1>
                                             <h1 className="flex items-center gap-2"><BiSolidUpvote className="text-xl text-green-600" /><span className="text-green-900 font-bold">{vote}</span></h1>
                                        </div>
                                   </button>
                              )}
                              <dialog id="my_modal_5" ref={voteModalRef} className="modal modal-middle sm:modal-middle">
                                   <div className="modal-box">
                                        <form onSubmit={handleVoteForm} action="">
                                             <label htmlFor="">
                                                  <h1 className="text-lg font-semibold">Work Environment:</h1>
                                                  <p className="text-sm font-medium mb-3">Do you find the overall work environment positive?</p>
                                             </label>
                                             <div className="space-x-3">
                                                  <input type="radio" name="vote" id="" value={'yes'} /> Yes
                                                  <input type="radio" name="vote" id="" value={'no'} /> No
                                             </div>
                                             <input className="btn mt-6 btn-success btn-outline" type="submit" value="Submit" />
                                        </form>
                                        <div className="modal-action">
                                             <form method="dialog">
                                                  <button className="btn">Close</button>
                                             </form>
                                        </div>
                                   </div>
                              </dialog>
                              {
                                   oldUsers.role ==='proUser'|| oldUsers.role ==='admin'||oldUsers.role ==='surveyor'? <> <button className="" onClick={() => document.getElementById('my_modal_7').showModal()}>
                                   <div className="btn grid size-20 shrink-0 place-content-center rounded-full border-2 border-indigo-500" aria-hidden="true">
                                        <h1 className="flex items-center gap-2"><FaComment className="text-xl" /></h1>
                                   </div>
                              </button>
                              <dialog id="my_modal_7" ref={commentModalRef} className="modal modal-middle sm:modal-middle">
                                   <div className="modal-box">
                                        <form onSubmit={handleComment} action="">
                                             <div>
                                                  <label className="label font-semibold" htmlFor="">Comment Here</label>
                                                  <textarea required name="comment" className="textarea textarea-accent" placeholder="Type here"></textarea>
                                             </div>
                                             <input className="btn mt-3 btn-success btn-outline" type="submit" value="Submit" />
                                        </form>
                                        <div className="modal-action">
                                             <form method="dialog">
                                                  <button className="btn">Close</button>
                                             </form>
                                        </div>
                                   </div>
                              </dialog> </> :<> 
                                <NavLink to={'/pricing'}> <button>  <div className="btn grid size-20 shrink-0 place-content-center rounded-full border-2 border-indigo-500" aria-hidden="true">
                                        <h1 className="flex items-center gap-2"><FaComment className="text-xl" /></h1>
                                   </div>
                              </button></NavLink> </>
                              }
                              
                              {reportDisable ? (
                                   <button className="" onClick={() => document.getElementById('my_modal_6').showModal()}>
                                        <div className="btn bg-orange-300 grid size-20 shrink-0 place-content-center rounded-full border-2 border-indigo-500" aria-hidden="true">
                                             <h1 className="flex items-center gap-2"><MdReportProblem className="text-xl text-red-900" /></h1>
                                        </div>
                                   </button>
                              ) : (
                                   <div className="hidden disabled btn bg-orange-300 sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500" aria-hidden="true">
                                        <h1 className="flex items-center gap-2"><MdReportProblem className="text-xl text-red-900" /></h1>
                                   </div>
                              )}
                              <dialog id="my_modal_6" className="modal modal-middle sm:modal-middle">
                                   <div className="modal-box">
                                        <form onSubmit={handleReportForm} action="">
                                             <label className="label font-semibold" htmlFor="">Why are you reporting?</label>
                                             <textarea required name="report" className="textarea textarea-accent" placeholder="Type the reason here"></textarea>
                                             <div className="mt-4">
                                                  <input className="btn w-1/2 btn-success btn-outline" type="submit" value="Submit" />
                                             </div>
                                        </form>
                                        <div className="modal-action">
                                             <form method="dialog">
                                                  <button className="btn">Close</button>
                                             </form>
                                        </div>
                                   </div>
                              </dialog>
                         </div>
                    </div>
               </article>
          </div>
     );
};

export default SurveyCardDetails;
