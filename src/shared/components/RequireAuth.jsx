import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const location = useLocation();

    if (!isAuthenticated) {
        loginWithRedirect({
            appState: { returnTo: location.pathname },
            authorizationParams: {
                scope: 'manage:inventory',
            },
        });
        return null;
    }

    return children;
};

export default RequireAuth;
