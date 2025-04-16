
import { useLocation } from "react-router-dom";
import { path } from "../routes/Path";
import { BsDoorOpen } from "react-icons/bs";
import {Accordion, AccordionItem, Button , Image, Card, CardHeader} from '@nextui-org/react';
import { useRouter } from '../hooks/use-router';
import { BiHome, BiLogOut } from "react-icons/bi";
// import avatar from '../assets/avatar.jpg'
import { MdSensors } from "react-icons/md";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import logo from '../assets/smart-home.png'
import { RxDashboard } from "react-icons/rx";
import { IoAddCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { PiBuildingApartment } from "react-icons/pi";

function Sidebar() {
    // const { toggleTheme } = useTheme();
    const itemClasses = {
        base: "w-full border-none focus:outline-none shadow-none",
        title: "font-normal text-medium ",
        trigger: "mt-2 bg-light-sidebar dark:bg-dark-sidebar rounded-lg h-12 w-11/12 hover:border-none  focus:outline-primary",
        indicator: "text-large text-black",
        content: "text-small border-none",
      };
    const { pathname } = useLocation();
    const router = useRouter();
    const { logout} = useAuth();
    const navs = [
        {
            name: 'Dashboard',
            icon: <BiHome className="size-6" />,
            key: 1,
            path: path.ADMIN.DASHBOARD,
        },
        {
            name: 'Management',
            icon: <RxDashboard className="text-2xl" />,
            key: 2,
            path: "....",
            subNav: [
                {
                    name: 'Sensor ',
                    path: path.ADMIN.SENSOR,
                    icon: <MdSensors className="text-xl"/>
                },
                {
                    name: 'Device',
                    path: path.ADMIN.SENSOR,
                    icon: <BsDoorOpen className="text-xl"/>
                },
                {
                    name: 'Room',
                    path: path.ADMIN.ROOM,
                    icon: <PiBuildingApartment className="text-xl"/>
                },
                
            ],
        },
        
        {
            name: 'Users',
            icon: <FiUser className="text-2xl" />,
            key: 3,
            path: path.ADMIN.USER,
        },
        {
            name: 'Settings',
            icon: <IoSettingsOutline className="text-2xl" />,
            key: 4,
            path: path.ADMIN.SETTING,
        }
    ];
    return (
        <>
            {/* <div className="flex justify-center items-center w-full ">
                <Image className="scale-[200%] mt-5" isBlurred width={50} src={logo} alt="Course Edut" />
            </div> */}
            <div className="flex flex-col h-full">
                <div className="flex flex-col h-full ml-5 mt-3 gap-2">
                    <div className="flex mt-7 ml-3 items-center ">
                        <Image className="" width={45} src={logo} radius='none' alt="Study Online" />
                        <h5 className=" ml-3 font-extrabold text-2xl text-black">Omni</h5>
                    </div>

                    <div className="flex w-full mt-[2rem]">
                        <Accordion 
                            showDivider={false}
                            className="w-full max-w-full p-0 border-none"
                            itemClasses={itemClasses}
                            // variant="shadow"
                            >
                            {navs.map((nav) => (
                                <AccordionItem
                                    textValue={'nav'}
                                    key={nav.key}
                                    hideIndicator={!nav?.subNav}
                                    indicator = {<IoAddCircleOutline />}
                                    // className={`hover:border-non `}
                                    aria-label="Connected devices"
                                    startContent={
                                        <div
                                            onClick={() => router.push(nav.path)}
                                            className={` ${
                                                pathname.includes(nav.path) ? 'text-primary font-bold' : 'text-black dark:text-white'
                                            }  flex justify-start items-center gap-4 border-none hover:text-black hover:font-bold`}
                                        >
                                            {nav.icon}
                                            <h2 >{nav.name}</h2>
                                        </div>
                                    }
                                    // title = {nav.name}
                                    

                                >
                                    {nav.subNav &&
                                        nav.subNav.map((subNav, index) => (
                                            <div
                                                onClick={() => router.push(subNav.path)}
                                                className={`flex  items-center justify-start gap-4 px-4 py-2  mt-[6px] bg-white rounded-lg cursor-pointer hover:font-bold  ${
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

                    
                    
                </div>

                <div className="flex w-4/5 mx-auto mt-[2rem] mb-[3rem]">
                        <Card className="py-4 bg-gradient-to-r from-primary via-[#246347] to-[#187044]">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center ">
                                <p className="text-sm text-white font-bold">Upgrade to Pro</p>
                                <small className="text-white mt-2">Get one month free and unlock</small>
                            </CardHeader> 
                            <Button 
                                className=" bg-primary w-fit text-white mx-auto mt-2 font-semibold"
                                radius="full"
                            >
                                Upgrade
                            </Button>
                        </Card>
                    </div>
                <div className="flex pb-5 ml-3">
                    <Button
                        className="bg-transparent hover:text-primary text-black"
                        startContent={<BiLogOut className="text-[30px]  over:thext-primary cursor-pointer"/>}
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

{/* <User
                        className="text-black mb-10"
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
                    /> */}