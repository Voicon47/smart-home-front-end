import './App.css'
// import { Toaster } from 'react-hot-toast';
import {Route, Routes } from 'react-router-dom';
import {  protectedRoutes, publicRoutes } from './routes/Routes';
// import { useTheme } from './context/themeContext';
import MainLayout from './layouts/MainLayout';

export enum Roles {
  ADMIN,
  STUDENT,
}

function App() {
//   const [count, setCount] = useState(0)
//   const { theme } = useTheme();
//   const role = Roles.ADMIN
  return (
    <>
       {/* <Toaster
          position="top-center"
          containerStyle={{
             zIndex: 1000000000000,
          }}
          toastOptions={{
             style: {
                background: theme ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.5)',
                color: theme ? 'white' : 'black',
                backdropFilter: 'blur(20rem)',
                userSelect: 'none',
             },
          }}
       /> */}
       <Routes>
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
