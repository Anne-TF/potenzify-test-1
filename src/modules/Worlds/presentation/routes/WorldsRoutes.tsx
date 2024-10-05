import { ErrorPage } from '@common/pages';

export const WorldRoutes = {
    path: "/worlds/:universeId",
    async lazy() {
        const { UnauthenticatedLayout } = await import("@common/layouts/UnauthenticatedLayout.tsx");
        return { Component: UnauthenticatedLayout };
    },
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            async lazy() {
                const { WorldsPage } = await import("../pages/Index.tsx");
                return {Component: WorldsPage};
            },
        },
    ],
};