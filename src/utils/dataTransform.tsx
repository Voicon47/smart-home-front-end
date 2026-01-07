// import { ISensorData } from "../components/SensorCard";
import { IDeviceData } from "../components/DeviceCard";
import { ISensorDataCard } from "../components/SensroCard";
import { IDeviceSchedule } from "../models/Device.model";

/**
 * Transforms raw sensor data into ISensorData format.
 * @param sensors - Raw sensor data array
 * @returns Transformed ISensorData array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformToISensorData = (sensors: any): ISensorDataCard[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sensors.map((sensor: any) => ({
    type: sensor.type,
    name: sensor.name,
    sensorId: null,
    // temperature: sensor.temperature || null,
    // humidity: sensor.humidity || null,
    // mq2: sensor.mq2 || null,
    // // flame: sensor.flame === null ? null : sensor.flame === 1 ? false : true,
    // flame: sensor.flame,
    // pir: null, // Set null since it's not present in the raw data
    value: sensor.value !== null ? sensor.value : null,
  }));
};

/**
 * Transforms raw device data into IDeviceData format.
 * @param devices - Raw device data array
 * @returns Transformed IDeviceData array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformToIDeviceData = (devices: any): IDeviceData[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return devices.map((device: any) => ({
    type: device.type,
    status: device.status,
    name: device.name,
    id: device.id,
  }));
};

export const flatSchedules = (data: any): IDeviceSchedule[] => {
  const list = Array.isArray(data) ? data : [data]; // ensure it's always an array
  return list.flatMap((device: any) =>
    device.schedules.map((schedule: any) => ({
      _id: schedule._id,
      deviceId: schedule.deviceId,
      name: device.name,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      dayActive: schedule.dayActive,
      status: schedule.status ? "true" : "false"
    }))
  );
};

// export const listSchedule = (data: any): IDeviceSchedule[] =>{
//   data.schedules.map((schedule: any) => ({
//     _id: schedule._id,
//     deviceId: schedule.deviceId,
//     name: device.name,
//     startTime: schedule.startTime,
//     endTime: schedule.endTime,
//     dayActive: schedule.dayActive,
//     status: schedule.status ? "true" : "false"
//   }))
// }