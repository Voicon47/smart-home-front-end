import { Select, SelectItem } from '@nextui-org/react';
import { TbSelector } from 'react-icons/tb';
import { MdCategory } from 'react-icons/md';
// import { ICategoryCourse } from '../../../model/Common.model';
import { useEffect, useState } from 'react';
import { ISensor } from '../../models/Sensor.model';

export const sensorExamples: ISensor[] = [
    {
      id: "1",
      name: "Temperature Sensor",
      type: "temperature",
      roomId: "101",
      _destroy: false,
    },
    {
      id: "2",
      name: "Humidity Sensor",
      type: "humidity",
      roomId: "102",
      _destroy: false,
    },
    {
      id: "3",
      name: "Motion Sensor",
      type: "motion",
      roomId: "103",
      _destroy: false,
    },
    {
      id: "4",
      name: "Light Sensor",
      type: "light",
      roomId: "104",
      _destroy: false,
    },
    {
      id: "5",
      name: "CO2 Sensor",
      type: "co2",
      roomId: "105",
      _destroy: true,
    },
  ];
  
export type ICategory = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any;
    nameCategory: string;
};

type SelectSensorProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResult: (res: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
};

const getAllAvailableSensor = async (): Promise<ISensor[] | null> => {
    try {
        const response = await fetch('https://localhost:7005/api/category-course', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: ISensor[] = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return null;
    }
};

function SelectAvailableSensor(props: SelectSensorProps) {
    const [sensors, setSensors] = useState<ISensor[]>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await getAllAvailableSensor();
            if (res) {
                setSensors([...res]);
            } else {
                setSensors([...sensorExamples])
            }

        };
        getData();
    }, []);

    console.log(props.value);
    return (
        <Select
            onChange={(val) => {
                // props.onResult(+val.target.value === 0 ? null : +val.target.value);
                props.onResult(val.target.value)
            }}
            startContent={<MdCategory className="text-xl" />}
            labelPlacement="outside"
            disableSelectorIconRotation
            placeholder="Chọn"
            label="Loại cảm biến "
            className="max-w-[10rem]"
            selectorIcon={<TbSelector className="text-xl" />}
            selectedKeys={props.value ? [props.value.toString()] : []}
        >
            {sensors.map((sensor: ISensor, index: number) => (
                <SelectItem key={sensor?.id ?? index} value={sensor.id} variant="flat" color="secondary">
                    {sensor.name}
                </SelectItem>
            ))}
        </Select>
    );
}

export default SelectAvailableSensor;