import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAppSelector} from '@/app/hooks';

export default function ProtectedRoute() {
    const isAuthed = useAppSelector(s => s.auth.isAuthenticated);
    const location = useLocation();

    if (!isAuthed) {
        return <Navigate to="/login" replace state={{from: location}}/>;
    }
    return <Outlet/>;
}
