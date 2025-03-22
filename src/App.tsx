import './App.css'
// import { Toaster } from 'react-hot-toast';
import {Navigate, Route, Routes } from 'react-router-dom';
import {  privateRoutes, protectedRoutes, publicRoutes } from './routes/Routes';
// import { useTheme } from './context/themeContext';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/authContext';
import { path } from './routes/Path';

export enum Roles {
  ADMIN,
  USER,
}

function App() {
   const {  role } = useAuth();
//   const [count, setCount] = useState(0)
//   const { theme } = useTheme();
//   const role = Roles.ADMIN
   return (
    <>
       <Toaster
          position="top-center"
          containerStyle={{
             zIndex: 1000000000000,
          }}
          toastOptions={{
             style: {
                background: 'rgba(255, 255, 255, 0.93)',
                color: 'black',
                backdropFilter: 'blur(20rem)',
                userSelect: 'none',
             },
          }}
       />
       <Routes>
         {/* Private Routes */}
         {privateRoutes.map((route, index) => (
             <Route
                key={index}
                path={route.path}
                element={
                  role === Roles.ADMIN ? (
                     <Navigate to={'/' + path.ADMIN.DASHBOARD} />
                  ) : (
                     <PublicLayout >{route.component}</PublicLayout>
                  )
               }
               //  element={<PublicLayout >{route.component}</PublicLayout>}
             />
          ))}
          {/* Protected Routes */}
          {protectedRoutes.map((route, index) => (
             <Route
                key={index}
                path={route.path}
                element={<MainLayout >{route.component}</MainLayout>}
             />
          ))}
          {/* Public Routes */}
          {publicRoutes.map((route, index) => (
             <Route
                key={index}
                path={route.path}
                element={route.component}
             />
          ))}
       </Routes>
    </>
 );
}

export default App
