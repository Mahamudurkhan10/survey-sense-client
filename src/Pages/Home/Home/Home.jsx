import Banner from "../Banner/Banner";
import LatestSurvey from "../LatestSurvey/LatestSurvey";
import MostVotedSurvey from "../MostVotedSurvey/MostVotedSurvey";


const Home = () => {
    
     return (
          <div>
               <Banner></Banner>
               <MostVotedSurvey></MostVotedSurvey>
               <LatestSurvey></LatestSurvey>
          </div>
     );
};

export default Home;