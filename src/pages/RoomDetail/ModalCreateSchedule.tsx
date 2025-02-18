import { Button, Checkbox, CheckboxGroup, Chip, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, TimeInput, useDisclosure, User } from "@nextui-org/react"
import SelectAvailableDevice from "./SelectAvailableDevice";
import { useState } from "react";
import SelectDayActive from "./SelectDayActive";
import type {TimeInputValue} from "@nextui-org/react";
type ModalCreateScheduleProps = {
    isOpen?: boolean;
    onClose?: () => void;
    onNewSchedule?: () => void;
}

function ModalCreateSchedule(props: ModalCreateScheduleProps) {
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const [device, setDevice] = useState<string>("")
    const [dayActive, setDayActive] = useState<string[]>([])
    const [startTime, setStartTime] = useState<TimeInputValue | null>(null)
    const [endTime, setEndTime] = useState<TimeInputValue | null>()

    const formatTime = (time: TimeInputValue | null) => {
    if (!time) return "00:00"; // Default fallback
    return `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
};
    // console.log(dayActive,device,formatTime(startTime))

    return (
        <Modal 
            placement="top-center" 
            onClose={props.onClose}
            isOpen={props.isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create new</ModalHeader>
              <ModalBody>
                <div className="flex flex-row gap-2">
                    <SelectAvailableDevice  onResult={(val) => setDevice(val)}/>
                    <SelectDayActive onResult={(val) => setDayActive(val)}/>
                </div>
                <div className="flex flex-row gap-2">
                    <TimeInput label="Start time" value={startTime} onChange={setStartTime}/>
                    <TimeInput label="End time" value={endTime} onChange={setEndTime}/>
                </div>
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}

export default ModalCreateSchedule