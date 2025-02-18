export type IDevice = {
    _id: string,
    roomId: string,
    name: string,
    type: string,

}
export type IDeviceSchedule = {
    _id: string,
    deviceId: string,
    name: string,
    startTime: string,
    endTime: string,
    dayActive: string,
    status: string,
}