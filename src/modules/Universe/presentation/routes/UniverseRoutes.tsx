import { ErrorPage } from '@common/pages';

export const UniverseRoutes = {
    path: "/",
    async lazy() {
        const { UnauthenticatedLayout } = await import("@common/layouts/UnauthenticatedLayout.tsx");
        return { Component: UnauthenticatedLayout };
    },
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            async lazy() {
                const { UniversesPage } = await import("../pages/Index.tsx");
                return {Component: UniversesPage};
            },
        },
    ],
};