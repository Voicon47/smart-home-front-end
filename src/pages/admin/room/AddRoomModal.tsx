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

type AddRoomModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; homeId: string }) => void
  homes?: { _id: string; name: string }[]
}

export default function AddRoomModal({
  isOpen,
  onClose,
  onSubmit,
  homes = []
}: AddRoomModalProps) {
  const [name, setName] = useState("")
  const [homeId, setHomeId] = useState("")

  const handleSubmit = () => {
    if (!name.trim()) return
    onSubmit({ name, homeId })
    setName("")
    setHomeId("")
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center"
    // classNames={{
    //   closeButton: "text-red-500 hover:text-red-600 hover:bg-red-50"
    // }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black">
              Add New Room
            </ModalHeader>

            <ModalBody>
              <Input
                label="Room name"
                placeholder="Enter room name"
                value={name}
                onChange={(e) => setName(e.target.value)}

              />

              <Select
                label="Home"
                selectedKeys={homeId ? [homeId] : ["677d0b16cc13de58fab8e372"]}
                onSelectionChange={(keys) =>
                  setHomeId([...keys][0] as string)
                }
              >
                {homes.map((home) => (
                  <SelectItem key={home._id} value={home._id} className="text-black">
                    {home.name}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Add Room
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
