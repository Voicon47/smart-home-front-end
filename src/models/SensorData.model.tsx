export type ISensorData = {
    _id?: string,
    sensorId: string,
    createAt: string,
    temperature?: number,
    humidity?: number,
    mq2?: number,
    flame?: boolean,
    pir?: boolean,
    _destroy: boolean

}