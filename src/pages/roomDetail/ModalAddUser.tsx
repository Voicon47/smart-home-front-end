import { Button, Checkbox, CheckboxGroup, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure, User } from "@nextui-org/react"
import { useEffect, useState } from "react";
import SearchUser from "../../components/SearchUser";
import { IUser } from "../../models/User.model";
import {  getAllUsersByQuery } from "./service";
type ModalAddUserProps = {
    // id: number;
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    onAddUser?: (selectedUsers: IUser[]) => void;
 };
function ModalAddUser(props: ModalAddUserProps) {
    const {  onOpenChange} = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [isSelected, setIsSelected] = useState<string[]>([]);
    const [query, setQuery] = useState<string>("");
    useEffect(() => {
        if (!props.isOpen) return;
        console.log(query)
        const initData = async () => {
           setIsLoading(true);
           const res = await getAllUsersByQuery(query);
           setIsLoading(false);
           setAllUsers(res)
        };
  
        initData();
    }, [query,props.isOpen]);
    console.log("Modal add user: ",isSelected)
    const handleConfirm = () => {
        const selectedUsersData = allUsers.filter(user => isSelected.includes(user.fullName));
        props.onAddUser?.(selectedUsersData); // Call parent function
        props.onClose?.(); // Close modal
    };
    return (
        <Modal 
            placement="top-center" 
            onClose={props.onClose}
            isOpen={props.isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur"
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Select users</ModalHeader>
                <ModalBody>
                    <SearchUser onChange={(val) => setQuery(val)}/>
                    <p>Selected: {isSelected.join(", ")}</p>
                    {isLoading ? (
                        <Spinner />
                     ) : (
                    <div className=" flex w-full h-[400px] rounded-xl border-2 border-primary space-y-2 overflow-auto">
                        <CheckboxGroup
                            className="w-full"
                            value={isSelected}
                            onChange={setIsSelected}
                        >   
                            {allUsers.map((user) => (
                                <Checkbox
                                key={user._id}
                                className="mx-2 mt-2 min-w-[384px] bg-gray-50 hover:bg-content2 items-center  cursor-pointer rounded-3xl gap-2 border-1 border-primary"
                                value={user.fullName}
                            >
                                <div className="w-[310px] flex justify-between gap-2">
                                    <User
                                        key={user._id}
                                        avatarProps={{
                                            radius: "sm",
                                            src: "",
                                        }}
                                        description={user.email}
                                        name={user.fullName} />
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-tiny text-default-500">{user.role}</span>
                                        <Chip color="success" size="sm" variant="flat">
                                            {user.status}
                                        </Chip>
                                    </div>
                                </div>
                            </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </div>
                     )}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Cancle
                    </Button>
                    <Button color="primary" onPress={handleConfirm}>
                        Confirm
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    );
}
export default ModalAddUser