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
        {
            path: 'stage/:stageId',
            async lazy() {
                const { Stage } = await import("../pages/Stage.tsx");
                return {Component: Stage};
            },
        },
        {
            path: 'stage-completed',
            async lazy() {
                const { StageCompleted } = await import("../pages/StageCompleted.tsx");
                return {Component: StageCompleted};
            },
        }
    ],
};