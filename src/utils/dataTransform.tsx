// import { ISensorData } from "../components/SensorCard";
import { IDeviceData } from "../components/DeviceCard";
import { ISensorData } from "../components/SensroCard";

/**
 * Transforms raw sensor data into ISensorData format.
 * @param sensors - Raw sensor data array
 * @returns Transformed ISensorData array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformToISensorData = (sensors: any): ISensorData[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sensors.map((sensor: any) => ({
    type: sensor.type,
    name: sensor.name,
    sensorId: null,
    temperature: sensor.temperature || null,
    humidity: sensor.humidity || null,
    mq2: sensor.mq2 || null,
    flame: sensor.flame === null ? null : sensor.flame === 1 ? false : true,
    pir: null, // Set null since it's not present in the raw data
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
  }));
};
