import useSurveys from "../../../Hooks/useSurveys";
import SurveyCard from "../../Shared/SurveyCard/SurveyCard";


const LatestSurvey = () => {
     const [surveys] = useSurveys()
  console.log(surveys);
     return (
          <div>
               <div className="text-center">
                    {
                    [...surveys].reverse().map(s => <>
                          <li> {s._id} </li>
                          <li> {s.timestamp.toString().split('T')[0]} </li>
                         </>)
                    }
                    <h1 className="text-4xl font-bold uppercase text-green-700 mb-4"> Latest Surveys </h1>
                    <p className="w-3/5 font-medium text-sm mx-auto text-center "> Exciting news! A new survey card is now available, offering fresh opportunities to share your opinions and shape the future. Don't miss out on this chance to make your voice heard! </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                         [...surveys].reverse().slice(0, 6).map(survey => <SurveyCard key={survey._id} survey={survey}></SurveyCard>)
                    }
               </div>
          </div>
     );
};

export default LatestSurvey;