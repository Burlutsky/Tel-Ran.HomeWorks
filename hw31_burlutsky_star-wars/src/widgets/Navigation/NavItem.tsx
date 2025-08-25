import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';
import type { NavItem as NavItemType } from '@shared/config/nav';

type Props = {
    item: NavItemType;
};

const NavItem = ({ item }: Props) => {
    // Превращаем "home" в "/home"
    const to = `/${item.route}`;

    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                }
            >
                {item.title}
            </NavLink>
        </li>
    );
};

export default NavItem;