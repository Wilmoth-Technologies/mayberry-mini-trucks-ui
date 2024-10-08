import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from "./routes/Root.jsx";
import ErrorPage from './shared/components/ErrorPage.jsx';
import NavBar from './shared/components/NavBar.jsx';
import Footer from './shared/components/Footer.jsx';
import Inventory from './routes/Inventory.jsx';
import InventoryDetailed from './routes/InventoryDetailed.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import Loading from './shared/components/Loading.jsx';
import RequireAuth from './shared/components/RequireAuth.jsx';
import RedirectHandler from './shared/components/RedirectHandler.jsx';
import Management from './routes/Management.jsx';

// Define a callback to handle successful login and redirection
const onRedirectCallback = (appState) => {
  // Navigate to /redirect-handler with the original path as a query parameter
  const returnTo = appState?.returnTo || '/';
  const redirectUrl = `${window.location.origin}/redirect-handler?returnTo=${encodeURIComponent(returnTo)}`;
  window.location.replace(redirectUrl);  // Perform the redirection
};


const router = createBrowserRouter([
  {
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/redirect-handler",
        element: <RedirectHandler />,  // This route will handle redirection to the correct route after login.
        errorElement: <ErrorPage />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/inventory/:vin",
        element: <InventoryDetailed />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/management",
        element: (<RequireAuth><Management /></RequireAuth>),
        errorElement: <ErrorPage />,
      }
    ],
    errorElement: <ErrorPage />,
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-kss71gvvwi5vchr2.us.auth0.com"
      clientId="vxJbnpUaMKkjSDMZ9BKenoUKoy9SZZWn"
      authorizationParams={{
        redirect_uri: window.location.origin + '/redirect-handler',
      }}
      onRedirectCallback={onRedirectCallback}
      audience={'https://service.mayberryminitrucks.com/'}
      scope={'read:user_permissions'}
    >
      <Loading />
      <RouterProvider router={router} />
      <Footer />
    </Auth0Provider>
  </StrictMode>,
)