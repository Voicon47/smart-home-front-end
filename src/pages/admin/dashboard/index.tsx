import CardDashBoard from "./DashboardCard"
// import avatar from '../../../assets/avatar.jpg'
import RoomCard from "../../../components/RoomCard"
import { Link } from "@nextui-org/react"
import HomeCard from "../../../components/HomeCard"
import SearchDashboard from "./SearchDashboard"
import AnnouncementListing from "./AnnoucementListing"
import { MdOutlineShowChart } from "react-icons/md"
import { IoMdAdd } from "react-icons/io";
import { RiCalendarScheduleLine } from "react-icons/ri"

function Dashboard() {
    return(
        <>
        <div className="w-full mt-5">
            <div className="flex flex-col gap-5">
                <div className="flex w-full justify-between">
                    <div className="flex flex-col w-full max-w-[1180px] ">

                        <div className="flex justify-between items-center mb-[2rem]">
                            <div className="flex flex-col items-start ">
                                <h2 className="font-bold text-3xl">Hello, Admin</h2>
                                <p>Track your home here. Have a nice day!</p>
                            </div>
                            <div className="flex gap-2">
                                <p>14 April,2025</p>
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                                    <RiCalendarScheduleLine className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                        
                        <SearchDashboard/>
                        <div className="mt-5">
                            <h3 className="text-start font-semibold">Overview</h3>
                            <div className="flex gap-5 w-full mt-1">
                                <CardDashBoard title={"Home"} icon={<MdOutlineShowChart/>} number={0} />
                                <CardDashBoard title={"Room"} icon={<IoMdAdd/>} number={0} />
                                <CardDashBoard title={"User"} icon={<IoMdAdd/>} number={0} />
                                <CardDashBoard title={"Device"} icon={<IoMdAdd/>} number={0} />
                                <CardDashBoard title={"Sensor"} icon={<IoMdAdd/>} number={0} />
                            </div>
                        </div>
                        <div className="w-[1180px]  flex-shrink-0 flex-grow mt-5">
                            <div className="flex justify-between">
                                <h3 className="text-start text-xl font-semibold">Home</h3>
                                <Link href="#" underline="hover" className=" font-normal text-stone-700 dark:text-white ">
                                    View all
                            </Link>
                            </div>
                            <div className="flex flex-row gap-5 mt-3">
                                <HomeCard name="Home 1" location="314 74TH" active={false} room={6} user={12} energy={0}/>
                                <HomeCard name="Home 1" location="314 74TH ST BROOKLYN NY 11209-2564 USA" active={false} room={6} user={12} energy={0}/>
                                <HomeCard name="Home 1" location="314 74TH ST BROOKLYN NY 11209-2564 USA" active={false} room={6} user={12} energy={0}/>
                                
                            </div>
                        </div>
                        <div className="w-[1180px]  flex-shrink-0 flex-grow mt-5">
                            <div className="flex justify-between">
                                <h3 className="text-start text-xl font-semibold">Attention Room</h3>
                                <Link href="#" underline="hover" className=" font-normal text-stone-700 dark:text-white ">
                                    View all
                            </Link>
                            </div>
                            <div className="flex flex-row gap-4 mt-3">
                                <RoomCard name={"AAA"} status={""} energy={0} userName={"Elephant47"}/>
                                <RoomCard name={"AAA"} status={""} energy={0} userName={"Loc81"}/>
                                <RoomCard name={"AAA"} status={""} energy={0} userName={"Phat BMTBMT"}/>
                                <RoomCard name={"AAA"} status={"AAA"} energy={0} userName={"Mango 521"}/>
                            </div>
                        </div>
                        
                    </div>
                <div className="flex">
                    <AnnouncementListing/>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard