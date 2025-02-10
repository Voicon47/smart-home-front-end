import { useEffect, useState } from "react";
import Search from "../../components/Search"
import { IFilterSensor, IStatusSensor } from "../../models/Common.model";
import SelectAvailableSensor from "./SelectAvailbleSensor";
import SelectStatusSensor from "./SelectStatusSensor";

type FilterBarCourseProps = {
    onChange: (value: IFilterSensor) => void;
};

function FilterBarSensor(props: FilterBarCourseProps) {
    
    const [query, setQuery] = useState<string | null>(null);
    const [status, setStatus] = useState<IStatusSensor| string | null>(null)
    const [sensorId, setSensorId] = useState<string | null>(null)
    useEffect(() => {
        let filter = {
            sensorId,
            status,
            query
        };
        props.onChange(filter)
    },[sensorId, status, query])

    return(
        <div className="flex justify-between gap-3 items-end ">
            <Search onChange={(val) => setQuery(val)} placeholder="Tìm kiếm theo..." />
            <div className="flex gap-3">
                <SelectAvailableSensor 
                    // value={sensorId}
                    onResult={(val) => setSensorId(val)}/>
                <SelectStatusSensor onResult={(val) => setStatus(val)}/>
            </div>
        </div>
        
    );
}   
export default FilterBarSensor