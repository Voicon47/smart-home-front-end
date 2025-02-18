import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { TbSelector } from "react-icons/tb";
import type {Selection} from "@nextui-org/react";
export type IDayActive = {
    id: any;
    nameState: string;
 };
type SelectDayActiveProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResult: (res: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
};
function SelectDayActive(props: SelectDayActiveProps) {
    const categories: IDayActive[] = [
    {
        id: 1,
        nameState: 'Monday',
    },
    {
        id: 2,
        nameState: 'Tuesday',
    },
    {
        id: 3,
        nameState: 'Wednesday',
    },
    {
        id: 4,
        nameState: 'Thursday',
    },
    {
        id: 5,
        nameState: 'Friday',
    },
    {
        id: 6,
        nameState: 'Saturday',
    },
    {
        id: 7,
        nameState: 'Sunday',
    },
    {
        id: 8,
        nameState: 'Every day',
    }
    ];
    const [days, setDays] = useState<Selection>(new Set([]));

    console.log(Array.from(days))
    const handleSelectionChange = (keys: Selection) => {
        if (keys === "all") return;
        const selectedValues = Array.from(keys);
        setDays(keys);
        props.onResult(selectedValues);
    };
    // console.log("Query sensor");
    return (
        <Select
            onSelectionChange={handleSelectionChange}
            // startContent={<MdCategory className="text-xl" />}
            labelPlacement="outside"
            disableSelectorIconRotation
            placeholder="Select days"
            label="Day "
            className="min-w-[10rem] "
            selectorIcon={<TbSelector className="text-xl" />}
            selectionMode="multiple"
            selectedKeys={days}
            // onSelectionChange={setDays}
            // selectedKeys={props.value ? [props.value.toString()] : []}
        >
            {categories.map((dayActive: IDayActive, index: number) => (
                <SelectItem key={dayActive?.nameState ?? index} value={dayActive.nameState} variant="flat" color="secondary">
                    {dayActive.nameState}
                </SelectItem>
            ))}
        </Select>
    );
}

export default SelectDayActive;