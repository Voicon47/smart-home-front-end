import { useState } from "react";
import { IDeviceSchedule } from "../models/Device.model";
import FormConfirm from "./FormConfirm";
import ScheduleCard from "./ScheduleCard";
type ScheduleListProps = {
  scheduleList: IDeviceSchedule[];
  onDeleteUser?: (userId: string) => void;
};
function ScheduleList(props: ScheduleListProps){
    const [selectedId, setSelectedId] = useState<string | null>(null);
    
    return (
        <>   
        {props.scheduleList.map((schedule) => (
            <div
                key={schedule._id}
                onClick={() => setSelectedId(schedule._id)}
                className={`flex items-start space-x-4 p-4 rounded-lg shadow-sm transition-all duration-300 cursor-pointer ${
                selectedId === schedule._id
                    ? "bg-gray-100 shadow-lg"
                    : "bg-white hover:shadow-md hover:bg-gray-50"
                }`}
            >
                <ScheduleCard
                    label={schedule.name}
                    startTime={schedule.startTime}
                    endTime={schedule.endTime}
                />
            </div>
            ))}
        <FormConfirm/>
        </>
    );
}
export default ScheduleList