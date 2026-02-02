import React, { useState } from 'react';
import {
   Table as TableNextUI,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   Chip,
   Spinner,
   Tooltip,
} from '@nextui-org/react';
// import avatar from '../../../assets/avatar.jpg'
import { IRoom } from '../../../models/Room.model';
import FormConfirm from '../../../components/FormConfirm';
import { DeleteIcon, EditIcon } from '../../../utils/icon';
const columns = [
   { name: 'Name', uid: 'name' },
   { name: 'Home ', uid: 'homeName' },
   { name: 'Status', uid: 'status' },
   { name: 'Action', uid: 'actions' },
];

type PropsType = {
   data: IRoom[];
   isLoading?: boolean;
   onDeleteRoom: (_id: string) => void
};
export default function TableRoom({ data, isLoading, onDeleteRoom }: PropsType) {
   // const [userIdSelect, setUserIdSelect] = useState<any>(null);
   const [selectedId, setSelectedId] = useState<string>();
   const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
   const handleConfirmDelete = () => {
      if (selectedId) {
         onDeleteRoom?.(selectedId);
         setIsOpenForm(false); // Close modal after deletion
      }
   };

   const renderCell = React.useCallback((room: IRoom, columnKey: React.Key) => {
      const cellValue = room[columnKey as keyof IRoom];
      switch (columnKey) {
         case 'name':
            return (
               <h5 className='capitalize'>{room.name}</h5>
            );
         case 'homeName':
            return <h5>{room.homeName}</h5>;
         case 'status': {
            return (
               <>
                  {room.status === "normal" ? (
                     <Chip className="capitalize" color="success" size="sm" variant="flat">
                        Normal
                     </Chip>
                  ) : room.status === "warning" ? (
                     <Chip className="capitalize" color="warning" size="sm" variant="flat">
                        Warning
                     </Chip>
                  ) : (
                     // <Chip className="capitalize" color="danger" size="sm" variant="flat">
                     //    Danger
                     // </Chip>
                     <Chip className="capitalize" color="success" size="sm" variant="flat">
                        Normal
                     </Chip>
                  )}
               </>
            );
         }
         case 'actions':
            return (
               <div className="relative flex items-center gap-2">
                  <Tooltip color='primary' content="Edit user">
                     <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                     </span>
                  </Tooltip>

                  <Tooltip color="danger" content="Delete room">
                     <span
                        onClick={() => {
                           setSelectedId(room._id)
                           setIsOpenForm(true)
                        }}
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                     >
                        <DeleteIcon />
                     </span>
                  </Tooltip>
               </div>
            );
         default:
            return cellValue;
      }
   }, []);

   return (
      <>
         {/* <ModalDetailUser onClose={() => setUserIdSelect(null)} isOpen={!!userIdSelect} id={userIdSelect} />. */}
         <TableNextUI aria-label="Example table with custom cells" selectionMode="single" >
            <TableHeader columns={columns}>
               {(column) => (
                  <TableColumn
                     className="font-extrabold"
                     key={column.uid}
                     align={column.uid === "actions" || column.uid === "status" ? "center" : "start"}
                  >
                     {column.name.toUpperCase()}
                  </TableColumn>
               )}
            </TableHeader>
            <TableBody
               isLoading={isLoading}
               loadingContent={<Spinner label="Loading..." />}
               emptyContent={<h5>Không có kết quả nào</h5>}
               items={data}
            >
               {(item) => (
                  <TableRow className=" cursor-pointer" key={item._id}>
                     {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
               )}
            </TableBody>
         </TableNextUI>
         <FormConfirm isOpen={isOpenForm} onClose={() => setIsOpenForm(false)} onAccepted={handleConfirmDelete} />
      </>
   );
}
