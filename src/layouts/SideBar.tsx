// import logo from '../../assets/react.svg';
import { GiOpenBook } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { path } from "../routes/Path";
import { BsPersonFill } from "react-icons/bs";
import {Accordion, AccordionItem, Button, Chip, User } from '@nextui-org/react';
import { useRouter } from '../hooks/use-router';
import { BiLogOut } from "react-icons/bi";
import avatar from '../assets/avatar.jpg'
import { MdSensors } from "react-icons/md";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

function Sidebar() {
    // const { toggleTheme } = useTheme();
    const itemClasses = {
        base: "py-0 w-full",
        title: "font-normal text-medium",
        trigger: " py-0 mx-auto mt-2 bg-light-sidebar dark:bg-dark-sidebar rounded-lg h-12 w-11/12 ",
        indicator: "text-medium",
        content: "text-small px-0 py-0",
      };
    const { pathname } = useLocation();
    const router = useRouter();
    const { logout} = useAuth();
    const navs = [
        {
            name: 'Dashboard',
            icon: <MdSpaceDashboard className="text-xl" />,
            key: 1,
            path: path.ADMIN.DASHBOARD,
        },
        {
            name: 'Management',
            icon: <GiOpenBook className="text-xl" />,
            key: 2,
            path: path.ADMIN.COURSE,
            subNav: [
                {
                    name: 'Sensor ',
                    path: path.ADMIN.SENSOR,
                    icon: <MdSensors className="text-xl "/>
                },
                {
                    name: 'Device',
                    path: path.ADMIN.SENSOR,
                    icon: <MdSensors className="text-xl"/>
                },
                {
                    name: 'Room',
                    path: path.ADMIN.ROOM,
                    icon: <MdSensors className="text-xl"/>
                },
                
            ],
        },
        
        {
            name: 'Users',
            icon: <BsPersonFill className="text-xl" />,
            key: 3,
            path: path.ADMIN.USER,
        },
    ];
    return (
        <>
            {/* <div className="flex justify-center items-center w-full ">
                <Image className="scale-[200%] mt-5" isBlurred width={50} src={logo} alt="Course Edut" />
            </div> */}
            <div className="flex flex-col h-full">
                <div className="flex flex-col ml-3 mt-3 flex-grow">
                    <User
                        className="text-white mb-10"
                        key={1}
                        avatarProps={{
                            size:"lg",
                            radius: "lg",
                            src: avatar,
                        }}
                        description={
                            <Chip color="success" variant="shadow">
                                <span className="text-sm font-semibold text-white">
                                    Admin
                                </span>
                            </Chip>
                            } // Adjust description size
                        name={<span className="text-lg font-bold">Administrator</span>} // Adjust name size
                    />
                    <Accordion 
                        showDivider={false}
                        className=" p-0 border-solid "
                        itemClasses={itemClasses}
                        // variant="shadow"
                        >
                        {navs.map((nav) => (
                            <AccordionItem
                                textValue={'nav'}
                                key={nav.key}
                                hideIndicator={!nav?.subNav}
                                // className={`px-3 hover:bg-[#AE57EA] rounded-lg h-14 `}
                                aria-label="Connected devices"
                                startContent={
                                    <div
                                        onClick={() => router.push(nav.path)}
                                        className={` ${
                                            pathname.includes(nav.path) ? 'text-primary' : 'text-black dark:text-white'
                                        }  flex justify-start items-center gap-4 `}
                                    >
                                        {nav.icon}
                                        <h2>{nav.name}</h2>
                                    </div>
                                }
                                // title = {nav.name}
                                

                            >
                                {nav.subNav &&
                                    nav.subNav.map((subNav, index) => (
                                        <div
                                            onClick={() => router.push(subNav.path)}
                                            className={`flex  items-center justify-start gap-4 px-4 py-2 mx-3 mt-[6px] bg-white rounded-lg cursor-pointer hover:font-bold  ${
                                                pathname.substring(1) === subNav.path
                                                    ? 'text-primary'
                                                    : 'text-black'
                                            }`}
                                            
                                            key={index}
                                        >
                                            {subNav.icon}
                                            {<p className="text-[15px]">{subNav.name}</p>}
                                        </div>
                                    ))}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
                <div className=" pb-5 mx-auto">
                    <Button
                        className="bg-transparent hover:text-primary text-white"
                        startContent={<BiLogOut className="text-[40px]  hover:text-primary cursor-pointer"/>}
                        onPress={() => {
                            logout()
                            toast.success('Đăng xuất thành công!');
                            router.push(path.AUTH.LOGIN)
                        }}
                    >Log out</Button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;