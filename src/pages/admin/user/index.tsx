import { useEffect, useState } from "react";
import FilterBarUser from "./FilterBarUser"
import { IUser } from "../../../models/User.model";
import { createNewUser, deleteUserById, getAllUsersByQuery } from "./service";
import TableUser from "./TableUser";
import { Button, Pagination } from "@nextui-org/react";
import AddUserModal from "./AddUserModal";


export type IFilterUser = {
    query?: string | null
    role?: string | null
}
function UserManagement() {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<IUser[]>([]);
    const [filterData, setFilterData] = useState<IFilterUser>({
        query: null,
        role: null,
    });
    const [isOpenModal, setOpenModal] = useState<boolean>(false)
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

    const handleAddUser = async (data: IUser) => {
        await createNewUser(data)

        const users = await getAllUsersByQuery(filterData)
        setUserData(users)
    }
    const handleDeleteUser = async (userId: string) => {
        await deleteUserById(userId)
        const users = await getAllUsersByQuery(filterData)
        setUserData(users)
    }
    return (
        <div className="w-full p-4">
            <div className="w-full">
                <h3 className="text-start text-2xl font-semibold">User</h3>
                <div className=" flex justify-between">
                    <FilterBarUser onChange={(res: IFilterUser) => setFilterData(res)} />
                    <div className='flex items-end'>
                        <Button onPress={() => setOpenModal(true)} color="primary">Add User</Button>
                    </div>
                </div>
                <div className="mt-5">
                    <TableUser isLoading={isLoading} data={userData} onDeleteUser={handleDeleteUser} />
                </div>
                <div className="p-4 mt-5 rounded-xl  flex justify-end items-center ">
                    <Pagination showControls total={5} initialPage={1} className="" />
                </div>
                <AddUserModal
                    isOpen={isOpenModal}
                    onClose={() => setOpenModal(false)}
                    onSubmit={handleAddUser}
                />
            </div>

        </div>
    )
}

export default UserManagement

