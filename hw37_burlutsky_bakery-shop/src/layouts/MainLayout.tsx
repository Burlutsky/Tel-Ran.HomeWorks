import {Outlet} from 'react-router-dom';
import MainNav from '@/components/MainNav';
import {NAV_ITEMS} from '@/app/navItems';

export default function MainLayout() {
    return (
        <>
            <MainNav items={NAV_ITEMS}/>
            <Outlet/>
        </>
    );
}
