import { useState, useEffect, useRef } from "react";
import UserList from "./UserList";
import { IUser } from "../models/User.model";
import { Button } from "@nextui-org/button";
import { IoMdAdd } from "react-icons/io";
import ModalAddUser from "../pages/roomDetail/ModalAddUser";

const ListingPeople = () => {
  const [listUser, setListUser] = useState<IUser[]>([
    {
      _id: "1",
      userName: "vandinhdung@gmail.com",
      imageUrl: "",
      password: "",
      email: "",
      status: "active",
      role: "user",
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      fullName: "A Tam"
    },
    // {
    //   _id: "2",
    //   userName: "Nguyen Tan Phat",
    //   roomId: "436 Street 3-2",
    //   imageUrl: "",
    //   password: "",
    //   email: "",
    //   status: "active",
    //   role: "user",
    //   createAt: new Date().toISOString(),
    //   updateAt: new Date().toISOString(),
    // }
  ]);
  // const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const listRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const handleAddUser = (selectedUsers: IUser[]) => {
    setListUser((prevList) => {
      // Filter out users that already exist in prevList
      const newUsers = selectedUsers.filter(
        (user) => !prevList.some((existingUser) => existingUser._id === user._id)
      );

      return [...prevList, ...newUsers]; // Add only unique users
    });
  };

  const handleDeleteUser = (userId: string) => {
    setListUser((prevList) => prevList.filter((user) => user._id !== userId));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        listRef.current &&
        !listRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        editButtonRef.current &&
        !editButtonRef.current.contains(target)
      ) {
        // setSelectedId(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="rounded-[24px] border-1 border-gray w-full sm:w-80 max-w-md mx-auto p-4 bg-gray-50 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">User</h2>
          {/* <div ref={dropdownRef} className="relative z-10">
            <ButtonDropdown onAdd={handleAdd} onDelete={handleDelete} />
          </div> */}
          <Button isIconOnly aria-label="add" size="sm" color="primary" variant="ghost" onPress={() => setIsOpenForm(true)}>
            <IoMdAdd className="size-5" />
          </Button>
        </div>

        <div
          ref={listRef}
          className="rounded-[24px] h-[200px] space-y-4 max-h-[200px] overflow-y-auto"
        >
          {listUser.length === 0 ? (<div className="text-center text-gray-500 italic">Danh sách trống</div>)
            : (<UserList userList={listUser} onDeleteUser={handleDeleteUser} />)}
        </div>

        <div className="mt-5 flex justify-center">
          <button
            ref={editButtonRef}
            style={{ backgroundColor: "#294646" }}
            className="rounded-[8px] px-10 py-2 text-white hover:opacity-90 transition"
          >
            Edit
          </button>
        </div>
      </div>
      <ModalAddUser isOpen={isOpenForm} onClose={() => setIsOpenForm(false)} onAddUser={handleAddUser} />
    </>
  );
};

export default ListingPeople;
