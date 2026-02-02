import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem
} from "@nextui-org/react"
import { useState } from "react"
import { IUser } from "../../../models/User.model"

type AddUserModalProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: IUser) => void
}

const AddUserModal = ({ isOpen, onClose, onSubmit }: AddUserModalProps) => {
    const [formData, setFormData] = useState<IUser>({
        email: "",
        fullName: "",
        password: "",
        phone: "",
        role: "user",
        status: "active"
    })

    const handleChange = (key: keyof IUser, value: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSubmit = () => {
        if (!formData.email || !formData.fullName) return
        onSubmit(formData)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Add New User</ModalHeader>

                <ModalBody className="gap-3">
                    <Input
                        label="Full Name"
                        value={formData.fullName}
                        onChange={e => handleChange("fullName", e.target.value)}
                        isRequired
                    />

                    <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={e => handleChange("email", e.target.value)}
                        isRequired
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={e => handleChange("password", e.target.value)}
                    />

                    <Input
                        label="Phone"
                        value={formData.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                    />

                    <Select
                        label="Role"
                        selectedKeys={[String(formData.role)]}
                        onSelectionChange={keys =>
                            handleChange("role", Array.from(keys)[0] as string)
                        }
                    >
                        <SelectItem key="admin">Admin</SelectItem>
                        <SelectItem key="user">User</SelectItem>
                    </Select>

                    <Select
                        label="Status"
                        selectedKeys={[String(formData.status)]}
                        onSelectionChange={keys =>
                            handleChange("status", Array.from(keys)[0] as string)
                        }
                    >
                        <SelectItem key="active">Active</SelectItem>
                        <SelectItem key="inactive">Inactive</SelectItem>
                    </Select>
                </ModalBody>

                <ModalFooter>
                    <Button variant="light" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onPress={handleSubmit}>
                        Add User
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddUserModal
