import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();

    const message = isRouteErrorResponse(error)
        ? `${error.status} ${error.statusText}`
        : error instanceof Error
            ? error.message
            : 'Unknown error';

    return (
        <main style={{ padding: 24 }}>
            <h1>Something went wrong</h1>
            <p>{message}</p>
            <p>
                <Link to="/home">Go to Home</Link>
            </p>
        </main>
    );
};

export default ErrorPage;
