export enum IStatusSensor {
    On,
    Off,
    Warning,
}

export type IFilterSensor = {
    sensorId?: number | string | null;
    status?: IStatusSensor | string | null;
    query?: string | null;
 };

