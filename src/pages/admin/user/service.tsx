import axios from "../../../helper/axios";
import { IFilterUser } from ".";
import { IUser } from "../../../models/User.model";

export const getAllUsersByQuery = async (queryData: IFilterUser): Promise<IUser[]> => {
    try {
        const result = await axios.post<IUser[]>("room/search", queryData)
        const roomsWithNormalStatus = result.data.map(room => ({
            ...room,
            status: "Normal",
        }))
        return roomsWithNormalStatus

    } catch (error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
};
