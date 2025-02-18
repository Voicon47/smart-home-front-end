export enum IStatusSensor {
    On,
    Off,
    Warning,
}

export type IFilterSensor = {
    sensorId:string | null;
    sensorType: string | null;
    status?: IStatusSensor | string | null;
    query?: string | null;
 };

