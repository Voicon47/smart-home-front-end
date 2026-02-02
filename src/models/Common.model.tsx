export enum IStatusSensor {
    On,
    Off,
    Warning,
}

export type IFilterSensor = {
    sensorId: string | null;
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

export type INotification = {
    room: string;
    status: "Danger" | "Warning";
    description: string;
    createdAt: number;
}
export type IPzemData = {
    id?: string;
    voltage: number; // V
    current: number; // A
    power: number; // W
    frequency: number; // Hz
    pf: number; // 0-1
    energy: number; // kWh
};