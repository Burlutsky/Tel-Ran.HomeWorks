import type {FC} from "react";

type Props = {
    text: string;
}

const NavItem: FC<Props> = ({text}) => {
    return <li>{text}</li>;
};

export default NavItem;