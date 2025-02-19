import { Button } from '@nextui-org/react';
import Search from '../../../components/Search';
import { GrPowerReset } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import { IFilterUser } from '.';
import SelectRoleUser from './SelectRoleUser';

type PropsType = {
   onChange: (text: IFilterUser) => void;
};
function FilterBarUser(props: PropsType) {
   // const [search, setSearch] = useState('');
   const [query, setQuery] = useState<string | null>(null);
   const [role, setRole] = useState<string | null>(null);
   useEffect(() => {
      let filter = {
          query,
          role,
      };
      props.onChange(filter);
  }, [query,role]);
   return (
      <div className="flex flex-col mt-5  gap-5 rounded-xl shadow-xl  backdrop-blur-xl  w-7/12 p-4">
        <div className='flex gap-2'>
            <p className='w-fit text-start bg-green-500/20 rounded-lg px-2'>Total: 3 member</p>
            <p className='w-fit text-start bg-purple-500/20 rounded-lg px-2'>New: 1 member</p>
        </div>
         <div className="w-full flex justify-between ">
            <div className='flex items-end gap-4'>
                <Search onChange={(val) => setQuery(val)} placeholder="Tìm kiếm theo tên, email, ..." />
                <SelectRoleUser onResult={(val) => setRole(val)}/>
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

export default FilterBarUser;