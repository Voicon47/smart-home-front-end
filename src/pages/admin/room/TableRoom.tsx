import React, { useState } from 'react';
import {
   Table as TableNextUI,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   Chip,
   Avatar,
   Spinner,
} from '@nextui-org/react';
// import avatar from '../../../assets/avatar.jpg'
import { IoMdTrash,IoMdConstruct  } from 'react-icons/io';
import { IRoom } from '../../../models/Room.model';
const columns = [
   { name: 'Name', uid: 'name' },
   { name: 'Home ID', uid: 'roomId' },
   { name: 'Status', uid: 'status' },
   { name: 'Action', uid: 'actions' },
];

type PropsType = {
   data: IRoom[];
   isLoading?: boolean;
};
export default function TableSensor({ data, isLoading }: PropsType) {
   // const [userIdSelect, setUserIdSelect] = useState<any>(null);

   const renderCell = React.useCallback((room: IRoom, columnKey: React.Key) => {
      const cellValue = room[columnKey as keyof IRoom];
      switch (columnKey) {
         case 'name':
            return (
               <h5 className='capitalize'>{room.name}</h5>
            );
         case 'roomId':
            return <h5>{room.homeId}</h5>;
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
                  <Chip className="capitalize" color="danger" size="sm" variant="flat">
                     Danger
                  </Chip>
               )}
              </>
            );
         }
         case 'actions':
            return (
                <div className="relative flex justify-center items-center gap-2">
                    <span className="text-lg cursor-pointer active:opacity-50">
                        <IoMdConstruct className="text-xl" />
                    </span>
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <IoMdTrash className="text-xl" />
                    </span>
                </div>
            );
         default:
            return cellValue;
      }
   }, []);

   return (
      <>
         {/* <ModalDetailUser onClose={() => setUserIdSelect(null)} isOpen={!!userIdSelect} id={userIdSelect} />. */}
         <TableNextUI   aria-label="Example table with custom cells" selectionMode="single" >
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
      </>
   );
}