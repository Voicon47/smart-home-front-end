import { IDevice } from "../../models/Device.model";
// import { IPaginationResponseDto } from "../../models/PaginatedResponse.Dto";
// import { IPaginationRequestDto } from "../../models/PaginationRequest.Dto";
import { ISensorData } from "../../models/SensorData.model";
import { ISensorQueryDto } from "../../models/SensorQuery.Dto";
import { IUser } from "../../models/User.model";
import { API_ROOT } from "../../utils/constants";
import { ISensorDataTable } from "./TableSensor";

export const getDataSensorById = async(id:string|null):Promise<ISensorData[]> => {
    try {
        const response = await fetch(import.meta.env.VITE_URL_API +'sensorData/'+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: ISensorData[] = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error
    }
}

// export const getDataSensor = async(
//     queryData: IPaginationRequestDto<ISensorQueryDto>) : Promise<IPaginationResponseDto<ISensorData>|null> => {
//         try {
//             const response = await fetch('http://localhost:8017/v1/sensorData', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(queryData),
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const responseData: IPaginationResponseDto<ISensorData> = await response.json();
//             return responseData;
//         } catch (error) {
//             console.error('Error during registration:', error);
//             throw error
//         }
// }
export const getDataSensor = async(
    queryData: ISensorQueryDto) : Promise<ISensorDataTable[]> => {
        try {
            const response = await fetch(API_ROOT +'sensorData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(queryData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData: ISensorDataTable[] = await response.json();
            return responseData;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error
        }
}
export const getAllUsersByQuery = async(queryData: string) : Promise<IUser[]> => {
        try {
            const response = await fetch(import.meta.env.VITE_URL_API +'user/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({query: queryData}),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData: IUser[] = await response.json();
            return responseData;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error
        }
}
export const getAllDevice = async():Promise<IDevice[]> => {
    try {
        const response = await fetch(import.meta.env.VITE_URL_API +'device', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: IDevice[] = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error
    }
}