import React from 'react';
import {
   Table as TableNextUI,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   Chip,
   Spinner,
} from '@nextui-org/react';
// import avatar from '../../../assets/avatar.jpg'
import { IoMdTrash,IoMdConstruct  } from 'react-icons/io';
import { ISensor } from '../../../models/Sensor.model';
const columns = [
   { name: 'Name', uid: 'fullName' },
   { name: 'Type', uid: 'type' },
   { name: 'Room ID', uid: 'roomId' },
   { name: 'Status', uid: 'status' },
   { name: 'Action', uid: 'actions' },
];

type PropsType = {
   data: ISensor[];
   isLoading?: boolean;
};
export default function TableSensor({ data, isLoading }: PropsType) {
   // const [userIdSelect, setUserIdSelect] = useState<any>(null);

   const renderCell = React.useCallback((sensor: ISensor, columnKey: React.Key) => {
      const cellValue = sensor[columnKey as keyof ISensor];
      switch (columnKey) {
         case 'fullName':
            return (
               <h5 className='capitalize'>{sensor.name}</h5>
            );
         case 'type':
            return <h5>{sensor.type}</h5>;
         case 'roomId':
            return <h5>{sensor.roomId}</h5>;
         case 'status': {
            return (
                <>
                {sensor.status === "normal" ? (
                  <Chip className="capitalize" color="success" size="sm" variant="flat">
                     Normal
                  </Chip>
                  ) : sensor.status === "warning" ? (
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