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
import ProtectedRoute from './shared/components/ProtectedRoute.jsx';
import Management from './routes/Management.jsx';
import Unauthorized from './shared/components/Unauthorized.jsx';
import Loading from './shared/components/Loading.jsx';
import { LoadingProvider } from './shared/providers/Loading.jsx';
import ScrollToTop from './shared/components/ScrollToTop.jsx';

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
        element: (
          <ProtectedRoute requiredScopes={['manage:inventory']}>
            <Management />
          </ProtectedRoute>),
        errorElement: <ErrorPage />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <Auth0Provider
        domain="dev-kss71gvvwi5vchr2.us.auth0.com"
        clientId="vxJbnpUaMKkjSDMZ9BKenoUKoy9SZZWn"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        audience={'https://service.mayberryminitrucks.com/'}
        scope={'read:user_permissions'}
      >
        <Loading />
        <RouterProvider router={router}>
          <ScrollToTop />
        </RouterProvider>
        <Footer />
      </Auth0Provider>
    </LoadingProvider>
  </StrictMode>,
)