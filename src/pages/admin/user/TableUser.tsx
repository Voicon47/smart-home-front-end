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
   Tooltip,
} from '@nextui-org/react';
import { IUser } from '../../../models/User.model';
// import avatar from '../../../assets/avatar.jpg'
import { DeleteIcon, EditIcon } from '../../../utils/icon';
import FormConfirm from '../../../components/FormConfirm';
const columns = [
   { name: 'Avatar', uid: 'avatar' },
   { name: 'Name', uid: 'fullName' },
   { name: 'Phone', uid: 'phone' },
   { name: 'Email', uid: 'email' },
   { name: 'Role', uid: 'role' },
   { name: 'Status', uid: 'status' },
   { name: 'Action', uid: 'actions' },
];

type PropsType = {
   data: IUser[];
   isLoading?: boolean;
   onDeleteUser: (_id: string) => void
};
export default function TableUser({ data, isLoading, onDeleteUser }: PropsType) {
   // const [userIdSelect, setUserIdSelect] = useState<any>(null);
   const [selectedId, setSelectedId] = useState<string>();
   const [isOpenForm, setIsOpenForm] = useState<boolean>(false)

   const handleConfirmDelete = () => {
      if (selectedId) {
         onDeleteUser?.(selectedId);
         setIsOpenForm(false); // Close modal after deletion
      }
   };
   const renderCell = React.useCallback((user: IUser, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof IUser];
      switch (columnKey) {
         case 'fullName':
            return (
               <h5>
                  {user.fullName ? (
                     user.fullName
                  ) : (
                     <Chip color="danger" variant="flat">
                        Chưa cập nhật
                     </Chip>
                  )}
               </h5>
            );
         case 'avatar':
            return <Avatar className='ml-5' alt={user.fullName} src={user.imageUrl} />;
         case 'email':
            return <h5>{user.email}</h5>;
         case 'role':
            return (
               <Chip className="capitalize" color="secondary" size="sm" variant="flat">
                  {user.role === "user" ? 'User' : 'Admin'}
               </Chip>
            );
         case 'status': {
            return (
               <>
                  {user.status === "active" ? (
                     <Chip className="capitalize" color="success" size="sm" variant="flat">
                        Active
                     </Chip>
                  ) : (
                     <Chip className="capitalize" color="danger" size="sm" variant="flat">
                        Inactive
                     </Chip>
                  )}
               </>
            );
         }
         case 'actions':
            return (
               <div className="relative flex justify-center items-center gap-2">
                  <Tooltip color='primary' content="Edit user">
                     <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                     </span>
                  </Tooltip>

                  <Tooltip color="danger" content="Delete room">
                     <span
                        onClick={() => {
                           setSelectedId(user._id)
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