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

 export type IResponse<T, U> = {
    status: number;
    meta: T;
    data: U | null;
    message: string;
};
export type IToken = {
    accessToken: string;
    refreshToken: string;
};