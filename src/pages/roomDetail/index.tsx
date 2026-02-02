import { useEffect, useState } from "react";
import ChartItem from "../../components/ChartItem";
import DeviceCard, { IDeviceData } from "../../components/DeviceCard"
import ListingScheduleCards from "../../components/ListingScheduleCards";

import SensorCard, { ISensorDataCard } from "../../components/SensroCard";
import { transformToIDeviceData, transformToISensorData } from "../../utils/dataTransform";
import FilterBarSensor from "./FilterBarSensor";
import { IFilterSensor, INotification, IPzemData } from "../../models/Common.model";
import TableSensor, { ISensorDataTable } from "./TableSensor";
import { getDataSensor } from "./service";
import { useAuth } from "../../context/authContext";
import { Pagination } from "@nextui-org/react";
import { IChartData } from "../../models/Chart.model";
import AnnouncementListing from "../admin/dashboard/AnnoucementListing";
import { useSelector } from "react-redux";
import { RoomState } from "../../redux/store";
import ListingPeople from "../../components/ListingPeople";
import webSocketService from "../../helper/webSocketService";
import PzemMonitor from "../../components/PzemMonitor";
import { Roles } from "../../App";
// import { Notification } from "./NotificationDrawer";
// import { ISensor } from "../../models/Sensor.model";

// import { IPaginationClientData } from "../../models/PaginatedResponse.Dto";
// import { IPaginationRequestDto } from "../../models/PaginationRequest.Dto";
// import { ISensorQueryDto } from "../../models/SensorQuery.Dto";
// // import axios from 'axios'
// import { API_ROOT } from "../utils/constants";

// import { useRouter } from "../../hooks/use-router";
// import { path } from "../../routes/Path";

// const FetchUserDataAPI = async (userId: string) => {
//     const response = await axios.get(`${API_ROOT}/v1/users/${userId}`)
//     return response.data
// }

const defaultData = `{
    "room": "677d0d50cc13de58fab8e379",
    "sensors": [
        { "name":"mq2_1","type":"MQ-2","mq2": 134 },
        { "name":"dht11_1","type":"DHT11","temperature": 28, "humidity": null },
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


function RoomDetail() {
    // const [user, setUser] = useState(null)
    const wsService = webSocketService;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sensorData, setSensorData] = useState<ISensorDataCard[]>([])
    const [deviceData, setDeviceData] = useState<IDeviceData[]>([])
    const [chartData, setChartData] = useState<IChartData[]>([]);
    // const [labelData, setLabelData] = useState<number[]>([]);
    const [data, setData] = useState<ISensorDataTable[]>([]);
    const [pzemData, setPzemData] = useState<IPzemData>({
        voltage: 232.2,
        current: 0,
        power: 1.6,
        pf: 1,
        energy: 0.018,
        frequency: 50,
    })

    const { isAuthenticated, user, role } = useAuth()
    const isAdmin = role == Roles.ADMIN
    const room = useSelector((state: RoomState) => state.room)
    console.log("Room in detail page: ", room)
    // const [paginationData, setPaginationData] = useState<IPaginationClientData>({
    //     totalPages: -1,
    //     size: 5,
    //     currentPage: 1,
    //  });
    const [filterData, setFilterData] = useState<IFilterSensor>({
        sensorId: "677faf7339a557ec6c1a9261",
        sensorType: null,
        status: null,
        query: null,
    });

    useEffect(() => {
        const defaultJson = JSON.parse(defaultData)
        setSensorData(transformToISensorData(defaultJson.sensors))
        setDeviceData(transformToIDeviceData(defaultJson.devices))
        ////demo when haven't websocket fro vercel deployment
        setChartData([])
        // setLabelData([])
    }, [])

    // useEffect(() => {
    //     // Initialize WebSocket connection when the component mounts
    //     // const socket = new WebSocket('wss://smart-home-back-end.onrender.com/ws'); // Replace with your WebSocket URL
    //     const socket = new WebSocket('ws://localhost:8017/ws')
    //     setWs(socket);

    //     socket.onopen = () => {
    //         console.log('WebSocket connection established and send register message');
    //         const payload = { type: 'register', role: "frontend" };
    //         socket.send(JSON.stringify(payload));
    //     };

    //     socket.onmessage = (event) => {
    //         try {

    //             const data = JSON.parse(event.data);
    //             console.log(data)
    //             if (data.sensors) {
    //                 setSensorData(transformToISensorData(data.sensors.filter((s: any) => s.type !== 'PZEM')));
    //                 //   chartData.push(data.sensors[1].temperature)
    //                 //   labelData.push( Date.now())
    //                 setChartData((prev) => [
    //                     ...prev,
    //                     {
    //                         labels: Date.now().toString(),
    //                         temperature: data.sensors[1]?.value.temperature || 0,
    //                         humidity: data.sensors[1]?.value.humidity || 0,
    //                     },

    //                 ]);
    //                 // Generate notifications based on sensor data from Arduino
    //                 const newNotifications: INotification[] = [];

    //                 // Example thresholds (adjust as needed)
    //                 if (data.sensors[1]?.temperature > 30) {
    //                     newNotifications.push({
    //                         room: "Room 1", // Adjust based on data.room if multiple rooms
    //                         description: "Cảnh báo quá nhiệt.",
    //                         status: "warning",
    //                         // icon: iconMap.overheating,
    //                     });
    //                 }
    //                 if (data.sensors[0]?.mq2 > 1000) { // Example threshold for gas
    //                     newNotifications.push({
    //                         room: "Room 1",
    //                         description: "Cảnh báo khí dễ cháy.",
    //                         status: "danger",
    //                         // icon: iconMap.gas,
    //                     });
    //                 }
    //                 if (data.sensors[2]?.flame === 1) {
    //                     newNotifications.push({
    //                         room: "Room 1",
    //                         description: "Cảnh báo lửa.",
    //                         status: "danger",
    //                         // icon: iconMap.flame,
    //                     });
    //                 }
    //                 // setNotifications((prev) => [...newNotifications, ...prev]);
    //             }
    //             if (data.devices) {
    //                 setDeviceData(transformToIDeviceData(data.devices));
    //             }
    //         } catch (error) {
    //             console.error("Error parsing WebSocket message:", error);
    //         }
    //     };

    //     socket.onerror = (event) => {
    //         console.error('WebSocket error:', event);
    //     };

    //     socket.onclose = () => {
    //         console.log('WebSocket connection closed.');
    //     };

    //     return () => {
    //         // Clean up the WebSocket connection when the component unmounts
    //         if (socket) {
    //             socket.close();
    //         }
    //     };
    // }, []);
    // // console.log(filterData)




    //  console.log(isLoading)

    // const sendControl = (deviceId: string, deviceState: boolean) => {
    //     console.log(user)
    //     if (ws && ws.readyState === WebSocket.OPEN) {
    //         const payload = {
    //             type: 'control',
    //             data: {
    //                 userId: user?._id || "unknown",
    //                 deviceId: "deviceId",
    //                 state: deviceState == true ? 'on' : 'off'
    //             }
    //         };
    //         ws.send(JSON.stringify(payload));
    //         console.log('Sent control message:', payload);
    //     } else {
    //         console.error('WebSocket is not open. Unable to send control message.');
    //     }
    //     console.log(`Device: ${deviceId}, State: ${deviceState}`);
    // }
    //  1. Connect & register listeners (only once)
    // ────────────────────────────────────────────────
    useEffect(() => {
        // Make sure connection is attempted
        wsService.connect('ws://localhost:8017/ws'); // ← uses default URL or pass your own

        // // You can listen to special events
        // wsService.addCallbacks('connect', () => {
        //     console.log('Room component knows: WS is connected');
        // });

        // wsService.addCallbacks('error', (e) => {
        //     console.error('WS error in room:', e);
        // });

        // Main sensor/device listener
        const handleSensorMessage = (message: any) => {
            if (!message?.sensors) return;
            const pzemSensor = message.sensors.find((s: any) => s.type === 'PZEM');
            // console.log("PZEM Sensor:", pzemSensor);
            if (pzemSensor && pzemSensor.value) {
                setPzemData({
                    voltage: pzemSensor.value.voltage || 0,
                    current: pzemSensor.value.current || 0,
                    power: pzemSensor.value.power || 0,
                    pf: pzemSensor.value.pf || 0,
                    energy: pzemSensor.value.energy || 0,
                    frequency: pzemSensor.value.frequency || 0,
                });
            }
            const sensors = message.sensors.filter((s: any) => s.type !== 'PZEM');

            setSensorData(transformToISensorData(sensors));

            // Chart update (assuming sensor[1] is DHT22 or similar)
            if (message.sensors[1]?.value) {
                setChartData(prev => [
                    ...prev,
                    {
                        labels: Date.now().toString(),
                        temperature: message.sensors[1].value.temperature ?? 0,
                        humidity: message.sensors[1].value.humidity ?? 0,
                    }
                ]);
            }

            // Notifications logic
            const newNotifs: INotification[] = [];

            if (message.sensors[1]?.value?.temperature > 30) {
                newNotifs.push({
                    room: "Room 1",
                    description: "Cảnh báo quá nhiệt",
                    status: "Warning",
                    createdAt: 1002
                });
            }

            if (message.sensors[0]?.mq2 > 1000) {
                newNotifs.push({
                    room: "Room 1",
                    description: "Cảnh báo khí dễ cháy",
                    status: "Danger",
                    createdAt: 10023222
                });
            }

            if (message.sensors[2]?.flame === 1) {
                newNotifs.push({
                    room: "Room 1",
                    description: "Cảnh báo lửa",
                    status: "Danger",
                    createdAt: 10023222
                });
            }

            // if (newNotifs.length > 0) {
            //     setNotifications(prev => [...newNotifs, ...prev]);
            // }
        };

        const handleDeviceMessage = (message: any) => {
            if (message?.devices) {
                setDeviceData(transformToIDeviceData(message.devices));
            }
        };

        wsService.addCallbacks('control', handleSensorMessage);   // ← assuming server sends { type: "sensors", sensors: [...] }
        wsService.addCallbacks('control', handleDeviceMessage);   // ← same idea

        // Optional: handle generic unknown type
        wsService.addCallbacks('unknown', (msg) => {
            console.log('Received unhandled message type:', msg?.type, msg);
        });

        return () => {
            // Important: clean up only the callbacks added by THIS component
            wsService.removeCallbacks('control', handleSensorMessage);
            wsService.removeCallbacks('control', handleDeviceMessage);
            // Do NOT call wsService.disconnect() here unless it's the last component using it
        };
    }, []); // ← empty deps = run once per mount

    // ────────────────────────────────────────────────
    //  2. Control device (now using the service)
    // ────────────────────────────────────────────────
    const sendControl = (deviceId: string, turnOn: boolean) => {
        const payload = {
            type: 'control',
            data: {
                userId: user?._id || "unknown",
                deviceId: deviceId,           // ← fixed typo: was hardcoded "deviceId"
                state: turnOn ? 'on' : 'off'
            }
        };

        const sent = wsService.sendMessage(payload);

        if (!sent) {
            console.warn('Message queued — WS not connected yet');
        } else {
            console.log('Control sent:', payload);
        }
    };
    useEffect(() => {
        console.log("UseEffect 2")
        if (!filterData) return; // Skip if filterData is empty
        const filter = async () => {
            // setData([])
            console.log("isLoading")
            console.log(data)
            setIsLoading(true);
            const newData = await getDataSensor(filterData)
            console.log("newdata: ", newData)
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
    return (
        <>
            {isAuthenticated && (
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-5">
                        {/* Main Content */}
                        {/* <div className="flex flex-col xl:flex-row w-full justify-between gap-4"> */}
                        <div className={`flex flex-col xl:flex-row  w-full justify-between gap-4`}>
                            {/* Sensor and Device Cards */}
                            <div className="flex flex-col w-full lg:max-w-[1024px]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                                    {(sensorData.length > 0 || deviceData.length > 0) && (
                                        <>
                                            {sensorData.map((c, index) => (
                                                <SensorCard key={index} data={c} />
                                            ))}
                                            {deviceData.map((c, index) => (
                                                <DeviceCard key={index} data={c} onToggleChange={sendControl} />
                                            ))}
                                        </>
                                    )}
                                </div>
                                <div className="w-full flex-shrink flex-grow mt-5">
                                    <ChartItem data={chartData} />
                                </div>
                            </div>

                            {/* Sidebar for Listing & Schedules */}
                            <div className="flex flex-col md:max-xl:flex-row justify-between gap-5 w-[20rem] ">
                                {/* <div className={`flex  ${!isAdmin ? "flex-row w-full" : "flex-col w-[20rem]"} md:max-xl:flex-row  justify-between gap-5 `}> */}
                                <div className="flex flex-col gap-5 ">
                                    {/* <div className={`flex ${!isAdmin ? "flex-row" : "flex-col"}  gap-5`}> */}
                                    <PzemMonitor dataPzem={pzemData} />
                                </div>
                                <div>
                                    <ListingScheduleCards />
                                    {/* <ListingPeople /> */}
                                </div>
                            </div>
                        </div>
                        {isAdmin && (
                            <div className="flex ">
                                <AnnouncementListing />
                                <div className=" w-[20rem]"><ListingPeople /> </div>

                            </div>
                        )}
                        {/* Filter & Table */}
                        <div className="w-full">
                            <FilterBarSensor onChange={(res: IFilterSensor) => setFilterData(res)} />
                            <div className="pt-5">
                                <TableSensor data={data} type={filterData.sensorType} isLoading={isLoading} />
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
            )}
        </>
    )
}
export default RoomDetail

