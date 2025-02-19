import { useEffect, useState } from "react";
import FilterBarSensor from "./FilterBarSensor"
import TableSensor from "./TableSensor";
import { Pagination } from "@nextui-org/react";
import { getAllSensorsByQuery } from "./service";
import { ISensor, mockSensors } from "../../../models/Sensor.model";


export type IFilterSensor = {
    query?: string | null
    status?: string | null
    type?: string | null
}
function SensorManagement(){
    const [isLoading, setIsLoading] = useState(false);
    const [sensorData, setSensorData] = useState<ISensor[]|null>([]);
    const [filterData, setFilterData] = useState<IFilterSensor>({
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
                <h3 className="text-start text-2xl font-semibold">Sensor</h3>
                <FilterBarSensor onChange={(res: IFilterSensor) => setFilterData(res)}/>
                <div className="mt-5">
                    <TableSensor isLoading={isLoading} data={mockSensors}/>
                </div>
                <div className="p-4 mt-5 rounded-xl  flex justify-end items-center ">
                    <Pagination showControls total={10} initialPage={1} className="" />
                </div>
            </div>
            
        </div>
    )
}

export default SensorManagement