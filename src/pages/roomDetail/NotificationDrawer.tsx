import { FC, useEffect, useRef } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button } from "@nextui-org/react";
import { INotification } from "../../models/Common.model";
import AlertSound from "../../assets/alertSound.mp3"
export type Notification = {
  id: number;
  title: string;
  message: string;
  type: "Danger" | "Warning" | "Info";
};

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: INotification[];
}

const NotificationDrawer: FC<NotificationDrawerProps> = ({ isOpen, onClose, notifications }) => {
  const alertAudio = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const latest = notifications[0];
    if (latest) {
      alertAudio.current?.play().catch(() => { });
    }
  }, [notifications]);

  return (
    <>
      <audio ref={alertAudio} src={AlertSound} preload="auto" />
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerContent>
          <DrawerHeader className="flex justify-between items-center border-b">
            <h3 className="text-lg font-semibold">Notifications</h3>
            {/* <Button
              variant="light"
              color="danger"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button> */}
          </DrawerHeader>

          <DrawerBody className="p-4 flex flex-col gap-3">
            {notifications.map((n, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border flex flex-col ${n.status === "Danger"
                  ? "border-red-500 bg-red-50"
                  : n.status === "Warning"
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200 bg-gray-50"
                  }`}
              >
                <span className="font-semibold">{n.room}</span>
                <span className="text-sm text-gray-600">{n.description}</span>
              </div>
            ))}
          </DrawerBody>

          <DrawerFooter className="border-t flex justify-end">
            <Button color="primary" onClick={onClose}>
              View all
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotificationDrawer;
