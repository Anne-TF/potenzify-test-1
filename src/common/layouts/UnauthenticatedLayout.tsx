import {Outlet} from 'react-router-dom';

export function UnauthenticatedLayout() {
    return (
        <main className={"min-h-[100vh] bg-neutral-300 dark:bg-neutral-800"}>
            <Outlet />
        </main>
    );
}
