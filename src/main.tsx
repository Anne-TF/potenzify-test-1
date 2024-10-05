import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@app/css/app.scss';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// ROUTES
import { UniverseRoutes } from '@modules/Universe/presentation/routes';
import { WorldRoutes } from '@modules/Worlds/presentation/routes';

const router = createBrowserRouter([
    UniverseRoutes,
    WorldRoutes
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
