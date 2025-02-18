import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

type FormConfirmProps = {
    isOpen?: boolean;
    onClose?: () => void;
    onAccepted?: () => void;
 };
function FormConfirm(props: FormConfirmProps){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
      <>
        <Modal
          backdrop="opaque"
          classNames={{
            backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
          isOpen={props.isOpen}
          onOpenChange={onOpenChange}
          onClose={props.onClose}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Are you sure ?</ModalHeader>
                {/* <ModalBody>
                   <p>Are you sure</p>
                </ModalBody> */}
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    No
                  </Button>
                  <Button color="primary" onPress={props.onAccepted}>
                    Yes
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}
export default FormConfirm