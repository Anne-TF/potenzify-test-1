import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@app/css/app.scss';

// ROUTES
import { UniverseRoutes } from '@modules/Universe/presentation/routes';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
    UniverseRoutes,
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
