import { useEffect, useState } from "react";
import FilterBarRoom from "./FilterBarRoom"
import { Button, Pagination } from "@nextui-org/react";
import { createNewRoom, deleteRoomById, getAllRoomByQuery } from "./service";
import { IRoom, mockRooms } from "../../../models/Room.model";
import AddRoomModal from "./AddRoomModal";
import TableRoom from "./TableRoom";


export type IFilterRoom = {
    query?: string | null
    status?: string | null
    type?: string | null
}
function RoomManagement() {
    const [isLoading, setIsLoading] = useState(false);
    const [roomData, setRoomData] = useState<IRoom[]>([]);
    const [filterData, setFilterData] = useState<IFilterRoom>({
        query: '',
        status: '',
        // type: 'default',
    });
    const [isOpenModal, setOpenModal] = useState<boolean>(false)

    useEffect(() => {
        // if (!filterData) return; // Skip if filterData is empty
        const filter = async () => {
            // setData([])
            console.log("Rooom isLoading")
            console.log(filterData)
            setIsLoading(true);
            const rooms = await getAllRoomByQuery(filterData) ///NOTE
            // console.log("newdata: ",newData)
            // console.log("unLoading")
            setIsLoading(false);
            setRoomData([...rooms])

        };
        console.log("isLoading")
        setIsLoading(true);
        const queryTimeout = setTimeout(filter, 1000);

        return () => {
            clearTimeout(queryTimeout);
        };
    }, [filterData]);

    const handleAddRoom = async (data: { name: string; homeId: string }) => {
        await createNewRoom(data)

        const rooms = await getAllRoomByQuery(filterData)
        setRoomData(rooms)

        console.log("Add room:", data)
    }
    const handleRemoveRoom = async (roomId: string) => {
        await deleteRoomById(roomId)
        const rooms = await getAllRoomByQuery(filterData)
        setRoomData(rooms)

        console.log("Delete room:", roomId)
    }
    return (
        <div className="w-full p-4">
            <div className="w-full">
                <h3 className="text-start text-2xl font-semibold">Room</h3>
                <div className=" flex justify-between">
                    <FilterBarRoom rooms={roomData || []} onChange={(res: IFilterRoom) => setFilterData(res)} />
                    <div className='flex items-end'>
                        <Button onPress={() => setOpenModal(true)} color="primary">Add New Room</Button>
                    </div>
                </div>
                <div className="mt-5">
                    <TableRoom isLoading={isLoading} data={roomData || mockRooms} onDeleteRoom={handleRemoveRoom} />
                </div>
                <div className="p-4 mt-5 rounded-xl  flex justify-end items-center ">
                    <Pagination showControls total={2} initialPage={1} className="" />
                </div>

                <AddRoomModal
                    isOpen={isOpenModal}
                    onClose={() => setOpenModal(false)}
                    onSubmit={handleAddRoom}
                    homes={[{ _id: "677d0b16cc13de58fab8e372", name: "home_1" }, { _id: "62d0416cc13de58sfab8e372", name: "home_2" }]}
                />
            </div>


        </div>
    )
}

export default RoomManagement