import { useCallback, useEffect, useState } from "react";
import  ChartItem  from "../../components/ChartItem";
import DeviceCard, { IDeviceData } from "../../components/DeviceCard"
import ListingPeople from "../../components/ListingPeople";
import ListingScheduleCards from "../../components/ListingScheduleCards";
// import ScheduleCard from "../components/ScheduleCard";
// import SensorCard from "../components/SensroCard"
// import TableItem from "../../components/TableItem";
// import axios from 'axios'
// import { API_ROOT } from "../utils/constants";
import SensorCard, { ISensorDataCard } from "../../components/SensroCard";
import { transformToIDeviceData, transformToISensorData } from "../../utils/dataTransform";
import FilterBarSensor from "./FilterBarSensor";
import { IFilterSensor } from "../../models/Common.model";
import TableSensor, { ISensorDataTable } from "./TableSensor";
// import { ISensor } from "../../models/Sensor.model";
import { Pagination } from "@nextui-org/react";
// import { IPaginationClientData } from "../../models/PaginatedResponse.Dto";
// import { IPaginationRequestDto } from "../../models/PaginationRequest.Dto";
// import { ISensorQueryDto } from "../../models/SensorQuery.Dto";
import { getDataSensor } from "./service";

// const FetchUserDataAPI = async (userId: string) => {
//     const response = await axios.get(`${API_ROOT}/v1/users/${userId}`)
//     return response.data
// }

const defaultData = `{
    "room": "677d0d50cc13de58fab8e379",
    "sensors": [
        { "name":"mq2_1","type":"MQ-2","mq2": null },
        { "name":"dht11_1","type":"DHT11","temperature": null, "humidity": null },
        { "name":"flame_1","type":"FLAME","flame": null }
    ],
    "devices": [
        { "name":"light_1", "type": "LIGHT", "status": null},
        { "name":"fan_1", "type": "FAN", "status": null}
    ]
  }`

//   const tableData = [
//     {
//         _id: "601a3b4c5d6e7f8a9b0c1d2e",
//         sensorId: "sensor_001",
//         createAt: "2025-01-31T12:00:00Z",
//         temperature: 22.5,
//         humidity: 55,
//         mq2: 150,
//         flame: false,
//         pir: false,
//         _destroy: false
//     },
//     {
//         _id: "601a3b4c5d6e7f8a9b0c1d2f",
//         sensorId: "sensor_002",
//         createAt: "2025-01-31T12:05:00Z",
//         temperature: 23.0,
//         humidity: 53,
//         mq2: 140,
//         flame: false,
//         pir: true,
//         _destroy: false
//     },
//     {
//         _id: "601a3b4c5d6e7f8a9b0c1d30",
//         sensorId: "sensor_003",
//         createAt: "2025-01-31T12:10:00Z",
//         temperature: 24.2,
//         humidity: 50,
//         mq2: 160,
//         flame: true,
//         pir: false,
//         _destroy: false
//     },
//     {
//         _id: "601a3b4c5d6e7f8a9b0c1d31",
//         sensorId: "sensor_004",
//         createAt: "2025-01-31T12:15:00Z",
//         temperature: 21.8,
//         humidity: 57,
//         mq2: 130,
//         flame: false,
//         pir: false,
//         _destroy: true
//     }
// ];



function RoomDetail(){
    // const [user, setUser] = useState(null)
    // const [ws, setWs] = useState<WebSocket | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sensorData, setSensorData] = useState<ISensorDataCard[]>([])
    const [deviceData, setDeviceData] = useState<IDeviceData[]>([])
    const [chartData, setChartData] = useState<number[]>([]);
    const [labelData, setLabelData] = useState<number[]>([]);
    const [data, setData] = useState<ISensorDataTable[]>([]);
    console.log(import.meta.env.VITE_URL_API)
    // const [paginationData, setPaginationData] = useState<IPaginationClientData>({
    //     totalPages: -1,
    //     size: 5,
    //     currentPage: 1,
    //  });
    const [filterData, setFilterData] = useState<IFilterSensor>({
        sensorId: null,
        sensorType: null,
        status: null,
        query: null,
     });
    // const handleChangePage = async (page: number) => {
    //     const queryData: IPaginationRequestDto<ISensorQueryDto> = {
    //         where: filterData,
    //         pageNumber: page,
    //         pageSize: paginationData.size,
    //     };
    //     setPaginationData((prev) => {
    //         return {
    //             ...prev,
    //             currentPage: page,
    //         };
    //     });
    //     // setIsLoading(true);
    //     // const res = await getAllCourse(queryData);
    //     // console.log("After change "+res)
    //     // setIsLoading(false);
    //     // res && setData(res.data);
    // };
    // useEffect(() => {
    //     const userId = '6777a2be6f390f3a1bcfde52'
    //     FetchUserDataAPI(userId).then(user => {
    //         setUser(user)
    //     })
    // }, [])
    
    useEffect(() => {
        const defaultJson = JSON.parse(defaultData)
        setSensorData(transformToISensorData(defaultJson.sensors))
        setDeviceData(transformToIDeviceData(defaultJson.devices))
    },[])

    useEffect(() => {
        // Initialize WebSocket connection when the component mounts
        const socket = new WebSocket('http://192.168.0.219:8017'); // Replace with your WebSocket URL
        // setWs(socket);

        socket.onopen = () => {
            console.log('WebSocket connection established and send register message');
            const payload = { type: 'register', role: "frontend" };
            socket.send(JSON.stringify(payload));
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log(data)
                if (data.sensors) {
                  setSensorData(transformToISensorData(data.sensors));
                //   chartData.push(data.sensors[1].temperature)
                //   labelData.push( Date.now())
                setChartData((prev) => [...prev, data.sensors[1]?.temperature || 0]);
                setLabelData((prev) => [...prev, Date.now()]);
                }
                if (data.devices) {
                  setDeviceData(transformToIDeviceData(data.devices));
                }
              } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        socket.onerror = (event) => {
            console.error('WebSocket error:', event);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        return () => {
        // Clean up the WebSocket connection when the component unmounts
        if (socket) {
            socket.close();
        }
        };
    }, []);
    console.log(filterData)

    // useEffect(() => {
    //     const initData = async() => {
    //         setIsLoading(true)
    //         const totalData = 100
    //         // const queryData: IPaginationRequestDto<ISensorQueryDto> = {
    //         //     where: {},
    //         //     pageNumber: 1,
    //         //     pageSize: paginationData.size,
    //         // }
    //         setPaginationData((prev) => {
    //             return {
    //                 ...prev,
    //                 totalPages: Math.ceil(totalData / paginationData.size)
    //             }
    //         })
    //         const res = await getDataSensor(filterData)
    //         console.log(res)
    //         setIsLoading(false)
    //         res && setData(res)
    //     }
    //     initData();
    // }, []);

    useEffect(() => {
        console.log("UseEffect 2")
        if (!filterData) return; // Skip if filterData is empty
        const filter = async () => {
            // setData([])
            console.log("isLoading")
            console.log(data)
            setIsLoading(true);
            const newData = await getDataSensor(filterData)
            console.log("newdata: ",newData)
            console.log("unLoading")
            setIsLoading(false);
            setData([...newData])
            
        };
        console.log("isLoading")
            setIsLoading(true);
        const queryTimeout = setTimeout(filter, 1000);
  
        return () => {
           clearTimeout(queryTimeout);
        };
     }, [filterData]);
    //  console.log(isLoading)
    return(
        <>
        <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
            {/* Main Content */}
            <div className="flex flex-col xl:flex-row w-full justify-between gap-4">
                {/* Sensor and Device Cards */}
                <div className="flex flex-col w-full lg:max-w-[1024px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                        {(sensorData.length > 0 || deviceData.length > 0) && (
                            <>
                                {sensorData.map((c, index) => (
                                    <SensorCard key={index} data={c} />
                                ))}
                                {deviceData.map((c, index) => (
                                    <DeviceCard key={index} data={c} />
                                ))}
                            </>
                        )}
                    </div>
                    <div className="w-full flex-shrink flex-grow mt-5">
                        <ChartItem data={chartData} labels={labelData}/>
                    </div>
                </div>

                {/* Sidebar for Listing & Schedules */}
                <div className="flex flex-col md:max-xl:flex-row justify-between gap-5 w-[20rem] ">
                    <div>
                        <ListingPeople/> 
                    </div>
                    <div>
                        <ListingScheduleCards/>
                    </div>
                </div>
            </div>

            {/* Filter & Table */}
            <div className="w-full">
                <FilterBarSensor onChange={(res: IFilterSensor) => setFilterData(res)}/>
                <div className="pt-5">
                    <TableSensor data={data} type={filterData.sensorType} isLoading={isLoading}/>
                </div>

                {/* Pagination */}
                {data.length > 0 && (
                    <div className="p-4 mt-5 flex justify-center sm:justify-end">
                        <Pagination
                            total={5}
                            page={1}
                            initialPage={1}
                            showControls
                            loop
                            // onChange={async (page) => await handleChangePage(page)}
                        />
                    </div>
                )}
            </div>
        </div>
    </div>

        </>
    )
}
export default RoomDetail

