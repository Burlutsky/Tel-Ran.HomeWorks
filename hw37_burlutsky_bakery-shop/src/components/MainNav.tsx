import * as React from 'react';
import {AppBar, Tabs, Tab, Toolbar, Tooltip, Box, Menu, MenuItem, Typography, Button} from '@mui/material';
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {logout} from "@/features/auth/authSlice.ts";

export type NavItem = {
    title: string;
    route?: string;        // Parent dropdown can not have self route
    auth?: boolean;        // Need auth
    children?: NavItem[];  // Dropdown menu children
};

type Props = { items: NavItem[] };

export default function MainNav({items}: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthed = useAppSelector(s => s.auth.isAuthenticated);

    // const user = useAppSelector(s => s.auth.user);
    const dispatch = useAppDispatch();

    // Active tab
    const activeValue = React.useMemo(() => {
        const pathname = location.pathname;
        type Candidate = { value: string; test: string };
        const candidates: Candidate[] = [];

        items.forEach(it => {
            const parentValue = it.route ?? it.title;
            if (it.route) candidates.push({value: parentValue, test: it.route});
            it.children?.forEach(ch => ch.route && candidates.push({value: parentValue, test: ch.route}));
        });

        const match = candidates
            .filter(c => pathname === c.test || pathname.startsWith(c.test + '/'))
            .sort((a, b) => b.test.length - a.test.length)[0];

        return match ? match.value : false;
    }, [location.pathname, items]);

    // Dropdown
    const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
    const [menuParentIndex, setMenuParentIndex] = React.useState<number | null>(null);
    const openMenu = (e: React.MouseEvent<HTMLElement>, index: number) => {
        setMenuAnchor(e.currentTarget);
        setMenuParentIndex(index);
    };
    const closeMenu = () => {
        setMenuAnchor(null);
        setMenuParentIndex(null);
    };

    // Click by protected route
    const handleGuardedClick = (e: React.MouseEvent, route?: string, auth?: boolean) => {
        if (!route) return;
        if (auth && !isAuthed) {
            e.preventDefault();
            navigate('/login', {state: {from: location}});
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <>
            <AppBar position="sticky" elevation={0}>
                <Toolbar sx={{gap: 2}}>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        Homework 34
                    </Typography>
                    <Tabs
                        value={activeValue}
                        onChange={() => {
                        }}
                        textColor="inherit"
                        indicatorColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        aria-label="Main navigation"
                    >
                        {items.map((item, idx) => {
                            const needsAuth = item.auth && !isAuthed;
                            const label = (
                                <Box sx={{display: 'inline-flex', alignItems: 'center', gap: 0.5}}>
                                    {item.title}
                                    {item.auth && <LockIcon fontSize="inherit" sx={{opacity: 0.7}}/>}
                                    {item.children && <ArrowDropDownIcon fontSize="small" sx={{ml: -0.25}}/>}
                                </Box>
                            );

                            // dropdown parent
                            if (item.children?.length) {
                                const tabEl = (
                                    <Tab
                                        key={item.title}
                                        value={item.route ?? item.title}
                                        label={label}
                                        onClick={(e) => openMenu(e, idx)}
                                    />
                                );
                                return needsAuth ? (
                                    <Tooltip key={item.title} title="Login required">{tabEl}</Tooltip>
                                ) : tabEl;
                            }

                            const tab = (
                                <Tab
                                    key={item.route}
                                    value={item.route}
                                    label={label}
                                    component={RouterLink}
                                    to={item.route!}
                                    onClick={(e) => handleGuardedClick(e, item.route, item.auth)}
                                    sx={needsAuth ? {opacity: 0.7} : undefined}
                                />
                            );
                            return needsAuth ? (
                                <Tooltip key={item.route} title="Login required">{tab}</Tooltip>
                            ) : tab;
                        })}
                    </Tabs>
                    <Box sx={{flexGrow: 1}}/>
                    {isAuthed ? (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button component={RouterLink} color="inherit" to="/login">Login</Button>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar/>

            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={closeMenu}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                keepMounted
            >
                {menuParentIndex != null &&
                    items[menuParentIndex].children!.map((child) => {
                        const needsAuth = child.auth && !isAuthed;
                        const itemEl = (
                            <MenuItem
                                key={child.route}
                                component={RouterLink}
                                to={child.route!}
                                onClick={(e) => {
                                    handleGuardedClick(e, child.route, child.auth);
                                    closeMenu();
                                }}
                                sx={needsAuth ? {opacity: 0.7} : undefined}
                            >
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    {child.title}
                                    {child.auth && <LockIcon fontSize="small"/>}
                                </Box>
                            </MenuItem>
                        );
                        return needsAuth ? (
                            <Tooltip key={child.route} title="Login required" placement="right">
                                {itemEl}
                            </Tooltip>
                        ) : itemEl;
                    })}
            </Menu>
        </>
    );
}
