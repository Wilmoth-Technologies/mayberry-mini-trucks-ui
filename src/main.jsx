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
import { Auth0Provider }  from '@auth0/auth0-react';
import Loading from './shared/components/Loading.jsx';

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
        redirect_uri: window.location.origin,
      }}
    >
      <Loading />
      <RouterProvider router={router} />
      <Footer />
    </Auth0Provider>
  </StrictMode>,
)
