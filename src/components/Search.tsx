import { Input } from '@nextui-org/react';
import { IoSearchOutline } from 'react-icons/io5';

type SearchProps = {
   className?: string;
   placeholder?: string;
   onChange?: (res: string) => void;
   value?: string;
};
function Search(props: SearchProps) {
   return (
      <Input
         className={`${props.className} select-none`}
         label="Search"
         value={props.value}
         onChange={(e) => props.onChange && props.onChange(e.target.value)}
         placeholder={props.placeholder ? props.placeholder : '...'}
         isClearable
         labelPlacement="outside"
         startContent={<IoSearchOutline />}
      />
   );
}

export default Search;