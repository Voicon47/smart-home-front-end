import {ReactNode} from "react";
import { path } from "./Path";
// import HomePage from "../pages/HomePage";
import Phat from "../pages/Phat";
// import RoomDetailPage from "../pages/RoomDetailPage";
import RoomDetail from "../pages/RoomDetail";
import Dashboard from "../pages/admin/dashboard";
import Login from "../pages/auth/Login";
import UserManagement from "../pages/admin/user";
import SensorManagement from "../pages/admin/sensor";


export type routeProps = {
    path: string;
    component: ReactNode;
    type: typeRoute;
 };
 
 export enum typeRoute {
    PRIVATE_ROUTE = 'private_route',
    PROTECTED_ROUTE = 'protected_route',
    PUBLIC_ROUTE = 'public_route',
 }

export const protectedRoutes: routeProps[] = [
   {
      path: path.PHAT,
      component:<Phat/>,
      type: typeRoute.PROTECTED_ROUTE,
   },
   {
      path: path.ADMIN.DETAIL_ROOM,
      component:<RoomDetail/>,
      type: typeRoute.PROTECTED_ROUTE,
   },
   {
      path: path.ADMIN.DASHBOARD,
      component: <Dashboard/>,
      type: typeRoute.PROTECTED_ROUTE
   },
   {
      path: path.ADMIN.USER,
      component: <UserManagement/>,
      type: typeRoute.PROTECTED_ROUTE
   },
   {
      path: path.ADMIN.SENSOR,
      component: <SensorManagement/>,
      type: typeRoute.PROTECTED_ROUTE
   },
   {
      path: path.ADMIN.ROOM,
      component: <UserManagement/>,
      type: typeRoute.PROTECTED_ROUTE
   },
   // {
   //    path: '/test',
   //    component: <TestPage />,
   //    type: typeRoute.PUBLIC_ROUTE,
   // },
   // {
   //    path: path.AUTH.VERIFY_ACCOUNT,
   //    component: <VerifyAccount />,
   //    type: typeRoute.PUBLIC_ROUTE,
   // },
   // {
   //    path: path.AUTH.RESET_PASSWORD,
   //    component: <RecoveryPassword />,
   //    type: typeRoute.PUBLIC_ROUTE,
   // },
   // {
   //    path: path.POST.DETAIL + '/:postId',
   //    component: <DetailPost />,
   //    type: typeRoute.PUBLIC_ROUTE,
   // },
];
export const publicRoutes: routeProps[] = [
   {
      path: path.AUTH.LOGIN,
      component: <Login />,
      type: typeRoute.PUBLIC_ROUTE,
   },
   // {
   //    path: path.ADMIN.POST,
   //    component: <PostManagement />,
   //    type: typeRoute.PROTECTED_ROUTE,
   // },
   // {
   //    path: path.ADMIN.POST + '/add',
   //    component: <AddPost />,
   //    type: typeRoute.PROTECTED_ROUTE,
   // },
   
];
export const privateRoutes: routeProps[] = [
   {
      path: path.ROOM,
      component: <RoomDetail/>,
      type: typeRoute.PRIVATE_ROUTE,
   },
   // {
   //    path: path.POST.VIEW,
   //    component: <ViewPost />,
   //    type: typeRoute.PRIVATE_ROUTE,
   // },
];

export const learningRoutes: routeProps[] = [
   
];
