import type { JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";

interface ProjectedRouteProps{
    children: JSX.Element
}

export default function ProjectedRouter({ children }: ProjectedRouteProps){
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    console.log('Is logged: ', isLoggedIn);
    

    if (!isLoggedIn) {
        return (
            <Navigate to={'/login'} replace/>
        )
    }

    return children;
}