import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import LatestSurvey from "../LatestSurvey/LatestSurvey";
import MostVotedSurvey from "../MostVotedSurvey/MostVotedSurvey";
import TrustedCompany from "../Company/TrustedCompany";
import CompanyGrowth from "../Company/CompanyGrowth";


const Home = () => {
    
     return (
          <div>
                  <Helmet>
                    <title> Survey Sense  </title>
               </Helmet>
               <Banner></Banner>
               <MostVotedSurvey></MostVotedSurvey>
               <LatestSurvey></LatestSurvey>
               <TrustedCompany></TrustedCompany>
               <CompanyGrowth></CompanyGrowth>
          </div>
     );
};

export default Home;