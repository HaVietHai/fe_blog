import { Navigate } from "react-router-dom";

let routes = {
    expense: [],
    default: [
        {
            path: '/login',
            element: <Navigate to="/"/>
        },
    ]
}

export default routes;