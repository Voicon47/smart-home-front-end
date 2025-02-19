export type ISensor = {
    _id: string,
    name: string,
    type: string,
    roomId: string,
    status: string,
    _destroy: boolean
}
export const mockSensors: ISensor[] = [
    {
        _id: "sensor_001",
        name: "Temperature Sensor",
        type: "DHT11",
        roomId: "room_101",
        status: "normal",
        _destroy: false,
    },
    {
        _id: "sensor_002",
        name: "Gas Sensor",
        type: "MQ-2",
        roomId: "room_102",
        status: "warning",
        _destroy: false,
    },
    {
        _id: "sensor_003",
        name: "Smoke Detector",
        type: "SMOKE",
        roomId: "room_103",
        status: "danger",
        _destroy: false,
    },
    {
        _id: "sensor_004",
        name: "Motion Detector",
        type: "PIR",
        roomId: "room_104",
        status: "normal",
        _destroy: false,
    },
    {
        _id: "sensor_005",
        name: "Flame Sensor",
        type: "FLAME",
        roomId: "room_105",
        status: "warning",
        _destroy: false,
    },
    {
        _id: "sensor_006",
        name: "Humidity Sensor",
        type: "DHT22",
        roomId: "room_106",
        status: "danger",
        _destroy: false,
    },
    {
        _id: "sensor_003",
        name: "Smoke Detector",
        type: "SMOKE",
        roomId: "room_103",
        status: "danger",
        _destroy: false,
    },
    {
        _id: "sensor_004",
        name: "Motion Detector",
        type: "PIR",
        roomId: "room_104",
        status: "normal",
        _destroy: false,
    }
];
