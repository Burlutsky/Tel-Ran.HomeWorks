import {navItems} from "../utils/constants.ts";
import NavItem from "./NavItem.tsx";


const Navigation = () => {
    return (
        <nav>
            <ul>
                {
                    navItems.map((item: string) => <NavItem key={item} text={item} />)
                }
            </ul>
        </nav>
    );
};

export default Navigation;