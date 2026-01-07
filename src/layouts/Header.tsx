import { Badge, Button, Image } from '@nextui-org/react';
import { BiLogOut } from 'react-icons/bi';
import { useRouter } from '../hooks/use-router';
import { path } from '../routes/Path';
import { useAuth } from '../context/authContext';
// import { GoBell } from 'react-icons/go';
import logo from '../assets/smart-home.png'
import { useEffect, useState } from 'react';
import NotificationDrawer from '../pages/roomDetail/NotificationDrawer';
import { IoNotifications } from 'react-icons/io5';
import { getNotioficationByRoom } from '../pages/roomDetail/service';
import { INotification } from '../models/Common.model';
// import toast from 'react-hot-toast';
function Header() {
   const router = useRouter();
   // const { toggleTheme } = useTheme();

   const { isAuthenticated, user, logout, isLoading } = useAuth();
   const [isOpen, setIsOpen] = useState(false);

   const [notifications, setNotifications] = useState<INotification[]>([]);
   const roomId = ""
   console.log(user)
   ///prevent flickering
   useEffect(() => {
      const fetchNotification = async () => {
         const data = await getNotioficationByRoom(roomId)
         setNotifications(data)
      }
      if (isOpen) {
         fetchNotification()
      }
      console.log("Notification")
   }, [isOpen, roomId])
   if (isLoading) {
      return null
   }

   return (
      <header className="flex select-none h-16 border-b-[1px] rounded-b-2xl border-solid dark:border-gray-900 dark:bg-dark-sidebar backdrop-blur-2xl sticky top-0 z-[100000] justify-between items-center p-4">
         <div
            onClick={() => {
               router.push('');
            }}
            className="cursor-pointer select-none flex justify-start items-center gap-5 w-1/3"
         >
            <Image className="ml-5" width={30} src={logo} radius='none' alt="Study Online" />
            <h5 className="ml-3 font-extrabold">Omni</h5>
         </div>
         {/* <Search /> */}
         <div className="w-1/3 flex justify-end items-center gap-4">
            {/* <p className=''>Hi, {user?.fullName || "User1"} </p> */}
            {/* <PiCloudMoonThin /> */}
            {isAuthenticated ? (
               <>
                  {/* <GoBell className="text-xl hover:text-primary cursor-pointer" /> */}
                  {/* 🔔 Notification Button */}
                  <Badge content={notifications.length} color="danger" shape="circle">
                     <Button
                        isIconOnly
                        className="rounded-full bg-transparent flex items-center justify-center hover:bg-gray-200 transition"
                        onPress={() => setIsOpen(true)}
                     >
                        <IoNotifications className="w-8 h-8 text-primary" />
                     </Button>
                  </Badge>

                  {/* 🧭 Drawer Notification Panel */}
                  <NotificationDrawer
                     isOpen={isOpen}
                     onClose={() => setIsOpen(false)}
                     notifications={notifications}
                  />
                  <p className=''>Hi, {user?.fullName || "User1"} </p>
                  <Button
                     className="bg-transparent hover:text-primary text-primary"
                     startContent={<BiLogOut className="text-[40px]  hover:text-primary cursor-pointer" />}
                     onPress={() => {
                        logout()
                        router.push(path.AUTH.LOGIN)
                     }}
                  >Log out</Button>
               </>
            ) : (
               <Button color="primary" onPress={() => {
                  logout()
                  // toast.success('Đăng xuất thành công!');
                  router.push(path.AUTH.LOGIN)
               }}>
                  Đăng nhập
               </Button>
            )}
         </div>
      </header>
   );
}

export default Header;
