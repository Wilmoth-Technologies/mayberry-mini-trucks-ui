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
import ManagementAddInventory from './routes/ManagementAddInventory.jsx';
import ManagementViewInventory from './routes/ManagementViewInventory.jsx';
import ManagementAddInventoryPreview from './routes/ManagementAddInventoryPreview.jsx';
import ManagementEditInventoryPreview from './routes/ManagementEditInventoryPreview.jsx';

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
            //Un-Comment in Local
      // {
      //   path: "/management",
      //   element: (
      //     <Management />
      //   ),
      //   errorElement: <ErrorPage />,
      // },
      // {
      //   path: "/management/add",
      //   element: (
      //     <ManagementAddInventory />
      //   ),
      //   errorElement: <ErrorPage />,
      // },
      // {
      //   path: "/management/view",
      //   element: (
      //     <ManagementViewInventory />
      //   ),
      //   errorElement: <ErrorPage />,
      // },
      // {
      //   path: "/management/add/:vin",
      //   element: (
      //     <ManagementAddInventoryPreview />
      //   ),
      //   errorElement: <ErrorPage />,
      // },
      // {
      //   path: "/management/edit/:vin",
      //   element: (
      //     <ManagementEditInventoryPreview />
      //   ),
      //   errorElement: <ErrorPage />,
      // },

      //Start Comment in Local
      {
        path: "/management",
        element: (
          <ProtectedRoute requiredScopes={['manage:inventory']}>
            <Management />
          </ProtectedRoute>),
        errorElement: <ErrorPage />,
      },
      {
        path: "/management/add",
        element: (
          <ProtectedRoute requiredScopes={['manage:inventory']}>
            <ManagementAddInventory />
          </ProtectedRoute>),
        errorElement: <ErrorPage />,
      },
      {
        path: "/management/view",
        element: (
          <ProtectedRoute requiredScopes={['manage:inventory']}>
            <ManagementViewInventory />
          </ProtectedRoute>),
        errorElement: <ErrorPage />,
      },
      {
        path: "/management/add/:vin",
        element: (
          <ProtectedRoute requiredScopes={['manage:inventory']}>
            <ManagementAddInventoryPreview />
          </ProtectedRoute>),
        errorElement: <ErrorPage />,
      },
      {
        path: "/management/edit/:vin",
        element: (
          <ProtectedRoute requiredScopes={['manage:inventory']}>
            <ManagementEditInventoryPreview />
          </ProtectedRoute>),
        errorElement: <ErrorPage />,
      },
      //End Comment in Local
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
        domain="auth.mayberry-mini-trucks-ui.dev.kubernetes-wilmoth.com"
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