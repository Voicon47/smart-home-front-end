import { Input } from '@nextui-org/react';
import { IoSearchOutline } from 'react-icons/io5';

type SearchProps = {
   className?: string;
   placeholder?: string;
   onChange?: (res: string) => void;
   value?: string;
};
function SearchDashboard(props: SearchProps) {
   return (
      <Input
         className={`${props.className} max-w-[25rem] select-none w-1/3 min-w-[15rem]`}
        //  label="Search"
         value={props.value}
         onChange={(e) => props.onChange && props.onChange(e.target.value)}
         radius='md'
         placeholder="Search"
         isClearable
         labelPlacement="inside"
         startContent={<IoSearchOutline />}
      />
   );
}

export default SearchDashboard;