import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useState } from "react";

export const useAccessToken = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState(null);

  const fetchAccessToken = useCallback(async () => {
    if (!isAuthenticated) return null;

    if (!token) {
      try {
        const accessToken = await getAccessTokenSilently({
            authorizationParams: {
                audience: 'https://service.mayberryminitrucks.com/',
            }
        });
        setToken(accessToken); // Cache the token
        return accessToken;
      } catch (error) {
        console.error("Error fetching access token: ", error);
        throw error;
      }
    }
    return token;
  }, [getAccessTokenSilently, isAuthenticated, token]);

  return fetchAccessToken;
};