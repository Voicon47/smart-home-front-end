import { useEffect, useState } from "react";
import { ChartItem } from "../components/ChartItem";
import DeviceCard from "../components/DeviceCard"
import ListingPeople from "../components/ListingPeople";
import ListingScheduleCards from "../components/ListingScheduleCards";
import ScheduleCard from "../components/ScheduleCard";
import SensorCard from "../components/SensroCard"
import TableItem from "../components/TableItem";
import axios from 'axios'
import { API_ROOT } from "../utils/constants";

const FetchUserDataAPI = async (userId: string) => {
    const response = await axios.get(`${API_ROOT}/v1/users/${userId}`)
    return response.data
}

function RoomDetailPage(){
    const [user, setUser] = useState(null)
    useEffect(() => {
        const userId = '6777a2be6f390f3a1bcfde52'
        FetchUserDataAPI(userId).then(user => {
            setUser(user)
        })
    }, [])
    const cardItem = [
        {
            name: "Light",
            status: false,

        },
        {
            name: "MQ-2",
            status: false,  
        },
        {
            name: "DHT-11",
            status: false,  
        },
        {
            name: "Fan",
            status: false
        }
    ];
    // console.log(import.meta.env.API_ROOT)
    return(
        <>
        <div className="w-full">
            <div className="flex flex-col gap-5">
                {/*  */}
                <div className="flex w-full justify-between">
                    {/*  */}
                    <div className="flex flex-col w-full max-w-[1180px]" >
                        <div className="flex gap-5 w-full">
                            <DeviceCard/>
                            <DeviceCard/>
                            <DeviceCard/>
                            <DeviceCard/>
                            <DeviceCard/>
                            <DeviceCard/>
                        </div>
                        <div className="w-[1180px] flex-shrink-0">
                            <ChartItem/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div>
                           <ListingPeople/> 
                        </div>
                        <div>
                            <ListingScheduleCards/>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <TableItem/>
                </div>
            </div>
        </div>
        </>
    )
}
export default RoomDetailPage