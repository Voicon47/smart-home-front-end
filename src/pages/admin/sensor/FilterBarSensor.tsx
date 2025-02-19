import { Button } from '@nextui-org/react';
import Search from '../../../components/Search';
import { GrPowerReset } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import { IFilterSensor } from '.';
import SelectStatusSensor from './SelectStatusSensor';
import SelectTypeSensor from './SelectTypeSensor';

type PropsType = {
   onChange: (text: IFilterSensor) => void;
};
function FilterBarSensor(props: PropsType) {
   // const [search, setSearch] = useState('');
   const [query, setQuery] = useState<string | null>(null);
   const [status, setStatus] = useState<string | null>(null);
   const [type, setType] = useState<string | null>(null);
   useEffect(() => {
      let filter = {
          query,
          status,
          type
      };
      props.onChange(filter);
  }, [query,type,status]);
   return (
      <div className="flex flex-col mt-5  gap-5 rounded-xl shadow-xl  backdrop-blur-xl  w-9/12 p-4">
        <div className='flex gap-2'>
            <p className='w-fit text-start bg-green-500/20 rounded-lg px-2'>Total: 8 sensor</p>
            <p className='w-fit text-start bg-purple-500/20 rounded-lg px-2'>Update: 1 sensor</p>
        </div>
         <div className="w-full flex justify-between gap-6">
            <div className='flex items-end gap-4'>
                <Search onChange={(val) => setQuery(val)} placeholder="Tìm kiếm theo tên, email, ..." />
                <SelectStatusSensor onResult={(val) => setStatus(val)}/>
                <SelectTypeSensor onResult={(val) => setType(val)}/>
                <div>
                    <Button
                        className=' text-black'
                        onPress={() => {
                        setQuery('');
                        props.onChange({query: null})

                    }}
                    startContent={<GrPowerReset className="text-xl text-black " />}
                    variant="flat"
                    color="primary"
                    >
                    Refresh
                    </Button>
                </div>
            </div>
            <div className='flex items-end'>
                <Button  color="primary">Add New User</Button>
            </div>
            
            
         </div>
      </div>
   );
}

export default FilterBarSensor;