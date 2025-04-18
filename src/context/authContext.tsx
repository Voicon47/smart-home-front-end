import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IUser } from '../models/User.model';
import helper from '../helper';
import { Roles } from '../App';
import { IToken } from '../models/Common.model';
// import { User } from '@nextui-org/react';
import Cookies from 'js-cookie'; // Ensure js-cookie is installed
interface AuthContextProps {
   children: ReactNode;
}

interface AuthContextValue {
   user: IUser | null;
   isAuthenticated: boolean;
   isLoading: boolean;
   login: (user: IUser, token: IToken) => void;
   logout: () => void;
   role: Roles | null;
   onUpdateUser: (user: IUser) => void;
}

export enum typeTheme {
   DARK_MODE = 'dark',
   LIGHT_MODE = 'light',
}
const getInitialRole = (): Roles | null => {
   const cookieRole = Cookies.get('userRole');
   // console.log("Cokkie "+cookieRole)
   switch (cookieRole) {
      case "0":
         return Roles.ADMIN;
      case "1":
         return Roles.USER;
      default:
         return Roles.USER; // Default to STUDENT or null, as preferred
   }
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [user, setUser] = useState<IUser | null>(null);
   const [role, setRole] = useState<Roles | null>(getInitialRole());
   const [isLoading, setIsLoading] = useState(true); // Add loading state
   // console.log("After "+role)
   const login = (user: IUser, token: IToken) => {
      setIsAuthenticated(true);
      setUser(user);
      if (user.role !== null && user.role !== undefined) {
         // setRole(user.role === 0 ? Roles.ADMIN : Roles.STUDENT)
         const userRole = user.role === 0 ? Roles.ADMIN : Roles.USER;
         setRole(userRole);
         Cookies.set('userRole', userRole.toString(), { expires: 7 });
      }
      helper.login(token);
      helper.saveUserData(user);
   }; 
   const logout = () => {
      helper.logout();
      setIsAuthenticated(false);
      setUser(null);
      setRole(null);
      
   };
   
   const onUpdateUser = (user: IUser) => {
      helper.saveUserData(user);
      setUser(user);
   };
   // console.log("First")
   // useEffect(() => {
   //    const accessToken = helper.getFullToken();
   //    const isAuth = accessToken !== null;
   //    console.log(isAuth)
   //    setIsAuthenticated(isAuth);
   //    const user = helper.getUserData();
   //    user && accessToken && login(user, accessToken);
   //    // console.log("Auth:"+isAuth)
   // }, []);
   useEffect(() => {
      const accessToken = helper.getFullToken();
      const storedUser = helper.getUserData();
   
      if (accessToken && storedUser) {
         setIsAuthenticated(true);
         setUser(storedUser);
         const userRole = storedUser.role === 0 ? Roles.ADMIN : Roles.USER;
         setRole(userRole);
         Cookies.set('userRole', userRole.toString(), { expires: 7 });
      } else {
         setIsAuthenticated(false);
      }
      setIsLoading(false)
   }, []);
   console.log("isAuthenticated Context: ", isAuthenticated)
   return (
      <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, role, onUpdateUser }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   // console.log(context?.role)
   if (!context) {
      throw new Error('useAuth must be used within a AuthProvider');
   }
   return context;
};