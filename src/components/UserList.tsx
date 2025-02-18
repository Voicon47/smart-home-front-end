import {  useState } from "react";
import { IUser } from "../models/User.model";
import avatar from "../assets/avatar.jpg"
import { User } from "@nextui-org/react";
import { FaRegTrashAlt } from "react-icons/fa";
import FormConfirm from "./FormConfirm";
// type User = {
//   id: string;
//   name: string;
//   dob: string;
//   address: string;
//   image: string;
// };

type UserListProps = {
  userList: IUser[];
  onDeleteUser?: (userId: string) => void;
};

function UserList(props: UserListProps){
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpenForm,setIsOpenForm] = useState<boolean>(false)
  // const [isLoading, setIsLoading] = useState(false);

  const handleConfirmDelete = () => {
    if (selectedId) {
      props.onDeleteUser?.(selectedId);
      setIsOpenForm(false); // Close modal after deletion
    }
  };
  console.log(selectedId)
  // useEffect(() => {
  //   const initData = async() => {
  //     setIsLoading(true)
  //   }
  // })
  return (
    <>
    <div className="space-y-2">
      {props.userList.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedId(user._id)}
          className={`flex justify-between items-start p-4 rounded-lg shadow-sm transition-all duration-300 cursor-pointer ${
            selectedId === user._id
              ? "bg-gray-100 shadow-lg"
              : "bg-white hover:shadow-md hover:bg-gray-50"
          }`}
        >
          <User 
            key={user._id}
            avatarProps={{
                radius: "sm",
                src: avatar,
            }}
            description= {user.email}
            name= {user.fullName}
          />
          <div className=" flex my-auto  size-7 justify-center items-center rounded-md border border-danger-300 ">
            <span 
              // onClick={() => props.onDeleteUser?.(user._id)}
              onClick={() => setIsOpenForm(true)}
              className="text-lg text-danger cursor-pointer active:opacity-50">
              <FaRegTrashAlt className="size-3" />
            </span>
          </div>
        </div>
      ))}
    </div>
    <FormConfirm isOpen={isOpenForm} onClose={() => setIsOpenForm(false)} onAccepted={handleConfirmDelete}/>
    </>
  );
};

export default UserList;
