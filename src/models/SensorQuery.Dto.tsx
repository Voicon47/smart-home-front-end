import { IStatusSensor } from "./Common.model";

export type ISensorQueryDto = {
    sensorId?: number | string | null;
    status?: IStatusSensor | string | null;
    query?: string | null;
};