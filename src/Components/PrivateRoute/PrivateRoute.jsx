import { Navigate } from "react-router-dom";
import { authService } from "../../services/api/api";
import { children } from "react";


export default function PrivateRoute(){
    return authService.isAuthenticated ? children : <Navigate to="/"/>;
}  