import { useCallback, useEffect, useState } from "react";
import { IDevice } from "../../models/Device.model";
import { getAllDevice } from "./service";
import { Select, SelectItem } from "@nextui-org/react";
import { TbSelector } from "react-icons/tb";

type SelectDeviceProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResult: (res: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
};
function SelectAvailableDevice(props: SelectDeviceProps) {
    const [devices, setDevices] = useState<IDevice[]>([]);

    
    const fetchDevices = useCallback(async () => {
        const res = await getAllDevice();
        if (res) setDevices(res);
    }, []);
    useEffect(() => {
        // console.log("Query sensor 2")
        fetchDevices();
    }, [fetchDevices]);

    // console.log("Query sensor");
    return (
        <Select
            onChange={(val: React.ChangeEvent<HTMLSelectElement>) => {
                const { value } = val.target;
                props.onResult(+value);
            }}
            // isRequired
            // startContent={<MdCategory className="text-xl" />}
            labelPlacement="outside"
            disableSelectorIconRotation
            placeholder="Select device"
            label="Device "
            className="min-w-[10rem] "
            selectorIcon={<TbSelector className="text-xl" />}
            // selectedKeys={props.value ? [props.value.toString()] : []}
        >
            {devices.map((device: IDevice, index: number) => (
                <SelectItem key={device?._id ?? index} value={device._id} variant="flat" color="secondary">
                    {device.name}
                </SelectItem>
            ))}
        </Select>
    );
}

export default SelectAvailableDevice;