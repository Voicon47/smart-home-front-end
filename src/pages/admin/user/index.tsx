import { useEffect, useState } from "react";
import FilterBarUser from "./FilterBarUser"
import { IUser, mockUsers } from "../../../models/User.model";
import { getAllUsersByQuery } from "./service";
import TableUser from "./TableUser";
import { Pagination } from "@nextui-org/react";


export type IFilterUser = {
    query?: string | null
    role?: string | null
}
function UserManagement(){
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<IUser[]|null>([]);
    const [filterData, setFilterData] = useState<IFilterUser>({
            query: null,
            role: null,
    });
    useEffect(() => {
        // if (!filterData) return; // Skip if filterData is empty
        const filter = async () => {
            // setData([])
            console.log("isLoading")
            console.log(userData)
            setIsLoading(true);
            const users = await getAllUsersByQuery(filterData)
            // console.log("newdata: ",newData)
            // console.log("unLoading")
            setIsLoading(false);
            setUserData([...users])
            
        };
        console.log("isLoading")
            setIsLoading(true);
        const queryTimeout = setTimeout(filter, 1000);
    
        return () => {
            clearTimeout(queryTimeout);
        };
        }, [filterData]);
    return(
        <div className="w-full p-4">
            <div className="w-full">
                <h3 className="text-start text-2xl font-semibold">User</h3>
                <FilterBarUser onChange={(res: IFilterUser) => setFilterData(res)}/>
                <div className="mt-5">
                    <TableUser  data={mockUsers}/>
                </div>
                <div className="p-4 mt-5 rounded-xl  flex justify-end items-center ">
                    <Pagination showControls total={10} initialPage={1} className="" />
                </div>
            </div>
            
        </div>
    )
}

export default UserManagement