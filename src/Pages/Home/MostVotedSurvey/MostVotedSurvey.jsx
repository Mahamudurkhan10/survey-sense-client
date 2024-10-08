
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SurveyCard from "../../Shared/SurveyCard/SurveyCard";
import MostSurveyCard from "../../Shared/SurveyCard/MostSurveyCard";

const MostVotedSurvey = () => {
     const [mostSurvey, setMostSurvey] = useState([]);
     const axiosPublic = useAxiosPublic()
     useEffect(() => {
          axiosPublic('/mostVotedSurvey')
               .then(res => {
                    setMostSurvey(res.data)
               })
     })
     return (
          <div>
               <div className="text-center">
                    <h1 className="text-4xl font-bold uppercase text-green-900 mb-5 "> Most Voted Surveys </h1>
                    <p className="lg:w-3/5 font-medium text-sm mx-auto text-center "> Exciting news! A new survey card is now available, offering fresh opportunities to share your opinions and shape the future. Don't miss out on this chance to make your voice heard! </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:gap-4">
                    {
                        mostSurvey.slice(0, 6).map(survey => <MostSurveyCard key={survey._id} survey={survey}></MostSurveyCard>)
                    }
               </div>
          </div>
     );
};

export default MostVotedSurvey;