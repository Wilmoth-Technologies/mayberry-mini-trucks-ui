import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading';

const RedirectHandler = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (isAuthenticated) {
            const returnTo = searchParams.get('returnTo') || '/';  // Read the returnTo query param
            navigate(returnTo);  // Trigger React Router navigation
        }
    }, [isAuthenticated, navigate, searchParams]);

    return <Loading/>;
};

export default RedirectHandler;