import { IFilterRoom } from ".";
import axios from "../../../helper/axios";
import { IRoom } from "../../../models/Room.model";
import { ISensor } from "../../../models/Sensor.model";

export const getAllSensorsByQuery = async (queryData: IFilterRoom): Promise<ISensor[]> => {
    try {
        const response = await fetch(import.meta.env.VITE_URL_API + 'user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: queryData }),
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

export const getAllRoomByQuery = async (filterData: IFilterRoom): Promise<IRoom[]> => {
    try {
        const result = await axios.get<IRoom[]>("room/search", {
            params: filterData
        })
        const roomsWithNormalStatus = result.data.map(room => ({
            ...room,
            status: "Normal",
        }))
        return roomsWithNormalStatus

    } catch (error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
}

export const createNewRoom = async (data: any): Promise<IRoom> => {
    try {
        const result = await axios.post<IRoom>("room", data)
        console.log(result)
        return result.data

    } catch (error) {
        console.error("Error fetching devices:", error);
        throw error;
    }

}
export const deleteRoomById = async (roomId: string): Promise<any> => {
    try {
        const result = await axios.delete(`room/${roomId}`)
        console.log(result)
        return result.data

    } catch (error) {
        console.error("Error deleting room:", error)
        throw error
    }
}