import { useEffect, useState } from "react";
import  ChartItem  from "../components/ChartItem";
import DeviceCard, { IDeviceData } from "../components/DeviceCard"
import ListingPeople from "../components/ListingPeople";
import ListingScheduleCards from "../components/ListingScheduleCards";
// import ScheduleCard from "../components/ScheduleCard";
// import SensorCard from "../components/SensroCard"
import TableItem from "../components/TableItem";
// import axios from 'axios'
// import { API_ROOT } from "../utils/constants";
import SensorCard, { ISensorData } from "../components/SensroCard";
import { transformToIDeviceData, transformToISensorData } from "../utils/dataTransform";

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

function RoomDetailPage(){
    // const [user, setUser] = useState(null)
    // const [ws, setWs] = useState<WebSocket | null>(null);
    const [sensorData, setSensorData] = useState<ISensorData[]>([])
    const [deviceData, setDeviceData] = useState<IDeviceData[]>([])
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
    // console.log(user)
    return(
        <>
        <div className="w-full">
            <div className="flex flex-col gap-5">
                {/*  */}
                <div className="flex w-full justify-between">
                    {/*  */}
                    <div className="flex flex-col w-full max-w-[1180px]" >
                        <div className="flex gap-5 w-full">
                            {(sensorData.length > 0 || deviceData.length > 0) && (
                                <>
                                    {sensorData.map((c,index) => (
                                        <SensorCard key={index} data={c} />
                                    ))}
                                    {deviceData.map((c,index) => (
                                        <DeviceCard key={index} data={c} />
                                    ))}
                                </>
                            )}
                        </div>
                        <div className="w-[1240px] flex-shrink-0 flex-grow mt-5">
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