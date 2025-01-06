// import { Outlet } from "react-router-dom";
import Header from "./Header";
// import { Roles } from "../App";
import Sidebar from "./SideBar";
type MainLayoutProps = {
    children: React.ReactNode;
    // isAuthenticated: boolean;
    // roles?: Roles[];
 };
 
 function MainLayout(props: MainLayoutProps) {
    return (
        <div className=" overflow-hidden min-w-full min-h-screen select-none">
            <Header/>
            <div className="flex mt-20 gap-2 ">
                <div className="select-none min-w-[15rem] shadow-2xl fixed z-auto flex justify-start  max-h-screen rounded-xl left-2 bottom-4 top-20 items-start flex-col">
                    <Sidebar/>
                </div>
                <div className="ml-[16rem] w-screen p-4 border-y-purple-50 rounded-2xl border-1 mr-[1rem]">{props.children}</div>
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default MainLayout;