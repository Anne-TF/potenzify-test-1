import {Outlet} from 'react-router-dom';

export function UnauthenticatedLayout() {
    return (
        <main className={"min-h-[100vh] bg-white dark:bg-neutral-800"}>
            <Outlet />
        </main>
    );
}
