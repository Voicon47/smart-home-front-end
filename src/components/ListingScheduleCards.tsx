import { useEffect, useState } from "react";
// import ScheduleCard from "./ScheduleCard";
// import ButtonDropdown from "./ButtonDropdown";
import { Button } from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";
import ScheduleList from "./ScheduleList";
import { IDeviceSchedule } from "../models/Device.model";
import ModalCreateSchedule from "../pages/RoomDetail/ModalCreateSchedule";

const ListingScheduleCards = () => {
  // const [listSchedule, setListSchedule] = useState([
  //   {
  //     id: 1,
  //     label: "Every day",
  //     startTime: "08:00",
  //     endTime: "09:00",
  //   },
  // ]);
  const [listSchedule, setListSchedule] = useState<IDeviceSchedule[]>([]);
  // const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isOpenForm,setIsOpenForm] = useState<boolean>(false)
  // const handleAdd = () => {
    
  // };

  // const handleDelete = () => {
  //   // if (selectedId === null) return;
  //   // setList((listSchedule) =>
  //   //   listSchedule.filter((schedule) => schedule.id !== selectedId)
  //   // );
  //   // setSelectedId(null);
  // };

  useEffect(() => {
    setListSchedule([])
  },[])



  return (
    <>
      <div className="rounded-[24px] border border-gray w-full sm:w-80 max-w-md mx-auto p-3 bg-gray-50 shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Schedules</h2>
          <Button isIconOnly aria-label="add" size="sm" color="primary" variant="ghost" onPress={() => setIsOpenForm(true)}>
              <IoMdAdd  className="size-5"/>
          </Button>
        </div>

        <div
          className="rounded-[24px] h-[200px] space-y-2 max-h-[200px] overflow-y-auto"
        >
          {listSchedule.length === 0 ? (<div className="text-center text-gray-500 italic">Danh sách trống</div>) 
            :(<ScheduleList scheduleList={listSchedule} />) }
        </div>
      </div>
      <ModalCreateSchedule isOpen={isOpenForm} onClose={() => setIsOpenForm(false)}/>
    </>
  );
};

export default ListingScheduleCards;
