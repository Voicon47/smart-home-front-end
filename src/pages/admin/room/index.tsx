import { useEffect, useState } from "react";
import FilterBarRoom from "./FilterBarRoom"
import TableSensor from "./TableRoom";
import { Pagination } from "@nextui-org/react";
import { getAllSensorsByQuery } from "./service";
import { ISensor } from "../../../models/Sensor.model";
import { mockRooms } from "../../../models/Room.model";


export type IFilterRoom = {
    query?: string | null
    status?: string | null
    type?: string | null
}
function RoomManagement(){
    const [isLoading, setIsLoading] = useState(false);
    const [sensorData, setSensorData] = useState<ISensor[]|null>([]);
    const [filterData, setFilterData] = useState<IFilterRoom>({
            query: null,
            status: null,
            type: null,
    });
    useEffect(() => {
        // if (!filterData) return; // Skip if filterData is empty
        const filter = async () => {
            // setData([])
            console.log("isLoading")
            console.log(sensorData)
            setIsLoading(true);
            const sensors = await getAllSensorsByQuery(filterData) ///NOTE
            // console.log("newdata: ",newData)
            // console.log("unLoading")
            setIsLoading(false);
            setSensorData([...sensors])
            
        };
        console.log("isLoading")
            setIsLoading(true);
        const queryTimeout = setTimeout(filter, 1000);
    
        return () => {
            clearTimeout(queryTimeout);
        };
        }, [filterData]);
    return(
        <div className="w-full p-4">
            <div className="w-full">
                <h3 className="text-start text-2xl font-semibold">Room</h3>
                <FilterBarRoom onChange={(res: IFilterRoom) => setFilterData(res)}/>
                <div className="mt-5">
                    <TableSensor isLoading={isLoading} data={mockRooms}/>
                </div>
                <div className="p-4 mt-5 rounded-xl  flex justify-end items-center ">
                    <Pagination showControls total={2} initialPage={1} className="" />
                </div>
            </div>
            
        </div>
    )
}

export default RoomManagement