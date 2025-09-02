import type {NavItem} from '@/components/MainNav';

export const NAV_ITEMS: NavItem[] = [
    {title: 'Home', route: '/'},
    {title: 'Orders', route: '/orders'},
    {title: 'Shopping Card', route: '/card', auth: true}, // Protected page
    {
        title: 'Products',
        children: [
            {title: 'Bread', route: '/bread'},
            {title: 'Diary', route: '/diary', auth: true},     // Protected page
        ],
    },
];
