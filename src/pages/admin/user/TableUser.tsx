import React from 'react';
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
import { IUser } from '../../../models/User.model';
// import avatar from '../../../assets/avatar.jpg'
import { IoMdTrash,IoMdConstruct  } from 'react-icons/io';
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
};
export default function TableUser({ data, isLoading }: PropsType) {
   // const [userIdSelect, setUserIdSelect] = useState<any>(null);

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