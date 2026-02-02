import axios from "../../../helper/axios";
import { IFilterUser } from ".";
import { IUser } from "../../../models/User.model";

export const getAllUsersByQuery = async (queryData: IFilterUser): Promise<IUser[]> => {
    try {
        const result = await axios.post<IUser[]>("user/search", queryData)
        console.log("User service", result.data)
        return result.data

    } catch (error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
};

export const createNewUser = async (data: IUser): Promise<IUser> => {
    try {
        const result = await axios.post<IUser>("user", data)
        console.log(result)
        return result.data

    } catch (error) {
        console.error("Error fetching devices:", error);
        throw error;
    }

}
export const deleteUserById = async (userId: string): Promise<IUser> => {
    try {
        const result = await axios.delete(`user/${userId}`)
        console.log(result)
        return result.data

    } catch (error) {
        console.error("Error deleting room:", error)
        throw error
    }
}