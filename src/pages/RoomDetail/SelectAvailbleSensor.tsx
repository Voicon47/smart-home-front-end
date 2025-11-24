import { Select, SelectItem } from '@nextui-org/react';
import { TbSelector } from 'react-icons/tb';
import { MdCategory } from 'react-icons/md';
// import { ICategoryCourse } from '../../../model/Common.model';
import { useCallback, useEffect, useState } from 'react';
import { ISensor } from '../../models/Sensor.model';
import instance from '../../helper/axios';


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
        // const response = await fetch(import.meta.env.VITE_URL_API+'sensor', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });
        const response = await instance.get<ISensor[] | null>("sensor")
        return response.data
    } catch (error: any) {
        console.error("Error during login:", error.response);
        // Handle API error response
        if (error.response) {
            throw new Error(error.response.data.message || `HTTP error! Status: ${error.response.status}`);
        } else {
            throw new Error("Network error or server not responding");
        }
    }
};

function SelectAvailableSensor(props: SelectSensorProps) {
    const [sensors, setSensors] = useState<ISensor[]>([]);

    // useEffect(() => {
    //     const getData = async () => {
    //         const res = await getAllAvailableSensor();
    //         if (res) {
    //             setSensors(res);
    //         } 
    //         // else {
    //         //     setSensors([...sensorExamples])
    //         // }

    //     };
    //     getData();
    // }, []);
    const fetchSensors = useCallback(async () => {
        const res = await getAllAvailableSensor();
        if (res) setSensors(res);
    }, []);
    useEffect(() => {
        console.log("Query sensor 2")
        fetchSensors();
    }, [fetchSensors]);

    // console.log("Query sensor");
    return (
        <Select
            onChange={(val) => {
                const selectedSensor = sensors.find(sensor => sensor._id === val.target.value);
                props.onResult({
                    id: val.target.value,
                    type: selectedSensor ? selectedSensor.type : null,  // Return sensor type
                });
            }}
            defaultSelectedKeys={sensors && sensors.length > 0 ? [sensors[0]._id] : ["677faf7339a557ec6c1a9261"]}
            startContent={<MdCategory className="text-xl" />}
            labelPlacement="outside"
            disableSelectorIconRotation
            placeholder="Select sensor"
            label="Sensor "
            className="min-w-[10rem] max-w-[15rem] "
            selectorIcon={<TbSelector className="text-xl" />}
        >
            {sensors.map((sensor: ISensor, index: number) => (
                <SelectItem key={sensor?._id ?? index} value={sensor._id} variant="flat" color="primary" className='text-black'>
                    {sensor.name}
                </SelectItem>
            ))}
        </Select>
    );
}

export default SelectAvailableSensor;