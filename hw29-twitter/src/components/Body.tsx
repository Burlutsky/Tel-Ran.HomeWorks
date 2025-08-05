import SideBar from "./SideBar.tsx";
import Content from "./Content.tsx";


const Body = () => {
    return (
        <div className={'body'}>
            <SideBar/>
            <Content/>
        </div>
    );
};

export default Body;