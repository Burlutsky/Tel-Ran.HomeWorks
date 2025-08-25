import {createBrowserRouter, Navigate} from 'react-router-dom';
import MainLayout from '@app/layout/MainLayout';
import Home from '@pages/Home';
import About from '@pages/About';
import StarWars from '@pages/StarWars';
import Contacts from '@pages/Contacts';
import ErrorPage from '@pages/Error';
import StarWarsDetails from '@pages/StarWars/Details';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <Navigate to="/home" replace/>},
            {path: 'home', element: <Home/>},
            {path: 'home/:heroId', element: <Home/>},
            {path: 'about_me', element: <About/>},
            {path: 'star_wars', element: <StarWars/>},
            {path: 'star_wars/:id', element: <StarWarsDetails/>},
            {path: 'contacts', element: <Contacts/>}
        ]
    }
]);

export default router;
