import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredScopes }) => {
    const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
    const [userHasRequiredScopes, setUserHasRequiredScopes] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkUserScopes = async () => {
            if (isLoading) {
                return;
            }

            if (!isAuthenticated) {
                await loginWithRedirect();
                return;
            }

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: 'https://service.mayberryminitrucks.com/',
                    }
                });
                const decodedToken = jwtDecode(accessToken);
                const permissions = decodedToken.permissions;

                setUserHasRequiredScopes(requiredScopes.every(scope => permissions.includes(scope)));
            } catch (error) {
                console.error("Error checking user scopes for Protected Route:", error);
                setUserHasRequiredScopes(false);
                throw new Response("Not Authorized", { status: 401});
            }
        };

        if (!isLoading) {
            checkUserScopes(); // Only run the check if Auth Validations are not loading
        }
    }, [isAuthenticated, getAccessTokenSilently, requiredScopes, loginWithRedirect, isLoading, location.pathname]);


    // Handle loading state
    if (isLoading || userHasRequiredScopes === null) {
        return <div>Loading...</div>; //TODO: Handle with overall loading component...
    }

    // If the user is not authenticated or doesn't have required scopes, redirect to unauthorized page
    if (!userHasRequiredScopes) {
        return <Navigate to="/unauthorized"/>;
    }

    // Render the protected component if user has the required scopes
    return children;
};

export default ProtectedRoute;
