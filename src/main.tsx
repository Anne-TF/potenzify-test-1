import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@app/css/app.scss';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

//PROVIDERS
import {NotificationProvider} from '@context/NotificationContext.tsx';

// ROUTES
import { UniverseRoutes } from '@modules/Universe/presentation/routes';
import { WorldRoutes } from '@modules/Worlds/presentation/routes';

const router = createBrowserRouter([
    UniverseRoutes,
    WorldRoutes
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
        <RouterProvider router={router} />
    </NotificationProvider>
  </StrictMode>,
)
