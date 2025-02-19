import { Select, SelectItem } from '@nextui-org/react';
import { TbSelector } from 'react-icons/tb';
import { MdCategory } from 'react-icons/md';
// import { ICategoryCourse } from '../../../model/Common.model';
import { useCallback, useEffect, useState } from 'react';
import { IUser } from '../../../models/User.model';


  
export type ICategory = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any;
    nameCategory: string;
};

type SelectRoleProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResult: (res: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
};

const categories: ICategory[] = [
      {
         id: 1,
         nameCategory: 'Admin',
      },
      {
         id: 2,
         nameCategory: 'User',
      },
      
   ];
function SelectRoleUser(props: SelectRoleProps) {
    // const [users, setUsers] = useState<IUser[]>([]);

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
    

    console.log("Query sensor");
    return (
        <Select
            onChange={(val) => {
                props.onResult(val.target.value);
            }}
            startContent={<MdCategory className="text-xl" />}
            labelPlacement="outside"
            disableSelectorIconRotation
            placeholder="Select user"
            label="User "
            className="min-w-[10rem] max-w-[15rem]"
            selectorIcon={<TbSelector className="text-xl" />}
            // selectedKeys={props.value ? [props.value.toString()] : []}
        >
            {categories.map((category: ICategory, index: number) => (
                <SelectItem key={category?.nameCategory ?? index} value={category.id} variant="flat" color="secondary">
                    {category.nameCategory}
                </SelectItem>
            ))}
        </Select>
    );
}

export default SelectRoleUser;