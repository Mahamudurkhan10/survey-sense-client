import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoutes = ({children}) => {
     const {user ,loading} =useAuth()
     const location = useLocation()
     if(loading){
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
     if(user){
          return children;
     }
     return <Navigate to={'/login'} state={{form: location}} replace></Navigate>
};

export default PrivateRoutes;