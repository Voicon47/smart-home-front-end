// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import { Roles } from "../App";
import Footer from "./Footer";
import Header from "./Header";
// import Sidebar from "./SideBar";
type MainLayoutProps = {
    children: React.ReactNode;
    isAuthenticated: boolean;
    // roles?: Roles[];
};

function PublicLayout(props: MainLayoutProps) {
    return (
        <div className=" overflow-hidden min-w-full min-h-screen select-none">
            <Header />
            <div className="mt-20 w-screen p-6  mr-[2rem]">{props.children}</div>
            {/* <Header/>
            <div className="flex mt-20 gap-2 ">
                <div className="select-none min-w-[15rem] bg-primary shadow-2xl fixed z-auto flex justify-start  max-h-screen rounded-xl left-2 bottom-1 top-20 items-start flex-col">
                    <Sidebar/>
                </div>
                <div className="ml-[16rem] w-screen p-4 border-y-purple-50 rounded-2xl border-1 mr-[1rem]">{props.children}</div>
            </div> */}
            {/* <div className="flex mt-2 gap-2 ">
                <div className="select-none min-w-[15rem] bg-primary shadow-2xl fixed z-auto flex justify-between  max-h-screen rounded-xl left-2 bottom-1 top-5 items-start flex-col">
                    <Sidebar/>
                </div>
                <div className="ml-[16rem] w-screen p-4  mr-[2rem]">{props.children}</div>
            </div> */}
            <Footer />
        </div>
    );
};

export default PublicLayout;

// import { useLocation } from "react-router-dom";
// import Footer from "./Footer";
// import Header from "./Header";
// import NotificationBar from "./NotificationBar";

// type MainLayoutProps = {
//     children: React.ReactNode;
//     isAuthenticated: boolean;
// };

// function PublicLayout(props: MainLayoutProps) {
//     const location = useLocation();

//     return (
//         <div className="w-screen h-full">
//             <div className="w-full grid grid-cols-4 min-h-screen select-none">
//                 <div className={`relative ${location.pathname === "/" ? "col-span-3" : " col-span-4"}`}>
//                     <Header />
//                     <div className="mt-20 p-6 mr-[2rem]">{props.children}</div>
//                 </div>
//                 <div className={` h-full relative ${location.pathname !== "/" ? "hidden" : "block col-span-1"}`}>
//                     <NotificationBar />
//                 </div>
//             </div>
//             <div className="w-full">
//                 <Footer />
//             </div>
//         </div>
//     );
// }

// export default PublicLayout;
