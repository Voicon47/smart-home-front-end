import { Select, SelectItem } from '@nextui-org/react';
import { TbSelector } from 'react-icons/tb';
import { MdPublishedWithChanges } from 'react-icons/md';
import { IStatusSensor } from '../../models/Common.model';
// import { IStatusCourse } from '../../../model/Course.model';

export type ICategory = {
   id: any;
   nameState: string;
   value: number;
};

type SelectStatusCourseProps = {
   onResult: (res: IStatusSensor) => void;
   value?: any;
};

function SelectStatusCourse(props: SelectStatusCourseProps) {
   const categories: ICategory[] = [
      {
         id: 1,
         nameState: 'On',
         value: IStatusSensor.On,
      },
      {
         id: 2,
         nameState: 'Off',
         value: IStatusSensor.Off,
      },
      {
        id: 3,
        nameState: 'Warning',
        value: IStatusSensor.Warning,
     }
   ];
   return (
      <Select
         onChange={(val: React.ChangeEvent<HTMLSelectElement>) => {
            const { value } = val.target;
            props.onResult(+value);
         }}
         startContent={<MdPublishedWithChanges className="text-xl" />}
         labelPlacement="outside"
         disableSelectorIconRotation
         placeholder="Select status"
         label="Status of sensor"
         className="min-w-[10rem] max-w-[14rem]"
         selectorIcon={<TbSelector className="text-xl" />}
         value={props.value}
         selectedKeys={props.value ? [props.value.toString()] : []}
      >
         {categories.map((category: ICategory) => (
            <SelectItem key={category.id} value={category.value} variant="flat" color="secondary">
               {category.nameState}
            </SelectItem>
         ))}
      </Select>
   );
}

export default SelectStatusCourse;