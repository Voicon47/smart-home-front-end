import { IFilterSensor} from ".";
import { ISensor } from "../../../models/Sensor.model";

export const getAllSensorsByQuery = async (queryData: IFilterSensor): Promise<ISensor[]> => {
    try {
        const response = await fetch(import.meta.env.VITE_URL_API+'user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query: queryData}),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: ISensor[] = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error
    }
};
