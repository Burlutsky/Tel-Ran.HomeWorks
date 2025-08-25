import { navItems } from '@shared/config/nav';
import NavItem from './NavItem';
import styles from './NavItem.module.css';

const Navigation = () => {
    return (
        <nav>
            <ul className={styles.nav}>
                {navItems.map((item) => (
                    <NavItem key={item.title} item={item} />
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
