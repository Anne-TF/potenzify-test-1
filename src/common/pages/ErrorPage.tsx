import {Link, useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error: unknown = useRouteError();
    console.error(error);

    return (
        <main className="bg-neutral-200 dark:bg-app-secondary px-4 h-[100vh] flex flex-col items-center justify-center dark:!text-white text-accent">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-app-primary-500 dark:!text-app-primary">Oops!</h1>
            <p className="mt-5 text-xl md:text-2xl text-center">Sorry, an unexpected error has occurred.</p>
            <p className="mt-4">
                <i>{(error as any).statusText || (error as any).message}</i>
            </p>

            <Link className="mt-5 bg-app-primary text-app-secondary px-6 py-3 rounded-lg text-bold" to="/">Go home</Link>
        </main>
    );
}