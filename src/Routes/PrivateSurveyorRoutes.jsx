import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

import useSurveyor from "../Hooks/useSurveyor";


const PrivateSurveyorRoutes = ({children}) => {
     const { surveyor, isSurveyorLoading } = useSurveyor();
     const { user, loading } = useAuth();
     const location = useLocation()
     
     if (loading || isSurveyorLoading) {
          return <div>
               <span className="loading loading-spinner text-primary"></span>
               <span className="loading loading-spinner text-secondary"></span>
               <span className="loading loading-spinner text-accent"></span>
               <span className="loading loading-spinner text-neutral"></span>
               <span className="loading loading-spinner text-info"></span>
               <span className="loading loading-spinner text-success"></span>
               <span className="loading loading-spinner text-warning"></span>
               <span className="loading loading-spinner text-error"></span>
          </div>
     }
     if (user && surveyor) {
          return children;
     }
     return <Navigate to={'/login'} state={{ form: location }} replace></Navigate>
};

export default PrivateSurveyorRoutes;