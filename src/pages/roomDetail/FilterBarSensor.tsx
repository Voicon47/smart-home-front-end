import { useCallback, useEffect, useMemo, useState } from "react";
import Search from "../../components/Search"
import { IFilterSensor, IStatusSensor } from "../../models/Common.model";
import SelectAvailableSensor from "./SelectAvailbleSensor";
import SelectStatusSensor from "./SelectStatusSensor";

type FilterBarCourseProps = {
    onChange: (value: IFilterSensor) => void;
};

function FilterBarSensor(props: FilterBarCourseProps) {

    const [query, setQuery] = useState<string>("");
    const [status, setStatus] = useState<IStatusSensor | string | null>(null)
    const [sensor, setSensor] = useState<{ id: string | null; type: string | null }>({ id: null, type: null });
    const filter = useMemo(
        () => ({
            sensorId: sensor.id || "null",
            sensorType: sensor.type || null,
            status: status || null,
            query: query.trim() || null
        }),
        [sensor, status, query]
    );
    // Callback to trigger onChange only when the filter changes
    const updateFilter = useCallback(() => {
        props.onChange(filter);
    }, [filter, props.onChange]);
    useEffect(() => {
        const delayDebounceFn = setTimeout(updateFilter, 500); // Debounce for 500ms
        return () => clearTimeout(delayDebounceFn);
    }, [updateFilter]);

    console.log("FilterBarSensor")
    return (
        <div className="flex flex-wrap justify-between gap-3 items-end ">
            <Search onChange={(val) => setQuery(val)} placeholder="Tìm kiếm theo..." />
            <div className="flex gap-3">
                <SelectAvailableSensor
                    // value={sensorId}
                    onResult={(val) => setSensor(val)} />
                <SelectStatusSensor onResult={(val) => setStatus(val)} />
            </div>
        </div>

    );
}
export default FilterBarSensor