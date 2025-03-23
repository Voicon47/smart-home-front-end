import { useState } from "react";
import { Input } from "@nextui-org/react";
// import { Eye, EyeOff } from "lucide-react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useRouter } from "../../hooks/use-router";
import { path } from "../../routes/Path";
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from "react-hot-toast";
import { useLoading } from "../../context/loadingContext";
import { IResponse, IToken } from "../../models/Common.model";
import { IUser } from "../../models/User.model";
import instance from "../../helper/axios";
import { useAuth } from "../../context/authContext";

type Inputs = {
  email: string
  password: string
}
// const loginFetch = async (userData: { email: string; password: string }): Promise<IResponse<IUser, IToken>> => {
//   try {
//       const response = await fetch(import.meta.env.VITE_URL_API+'user/login', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(userData),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
//       }
//       console.log("Return result")
//       const responseData: IResponse<IUser, IToken> = await response.json();

//       return responseData;
//   } catch (error) {
//       console.error('Error during registration:', error);
//       throw error; // You might want to handle or log the error differently
//   }
// };
export const loginFetch = async (
  userData: { email: string; password: string }
): Promise<IResponse<IToken, IUser>> => {
  try {
    const response = await instance.post<IResponse<IToken, IUser>>("user/login", userData);

    console.log("Return result: ", response);
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error.response);
    // Handle API error response
    if (error.response) {
      throw new Error(error.response.data.message || `HTTP error! Status: ${error.response.status}`);
    } else {
      throw new Error("Network error or server not responding");
    }
  }
};
function Login() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // const [username, setUsername] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  // const [error, setError] = useState<string>("");
  const router = useRouter();
  const toggleVisibility = (): void => setIsVisible((prev) => !prev);
  const loading = useLoading()
  const {register, handleSubmit} = useForm<Inputs>()
  const { login } = useAuth();

  

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const registerUser = {
        email: data.email,
        password: data.password,
    };

    console.log("Submit", registerUser);

    if (!registerUser.email || !registerUser.password) {
        console.log("Toast");
        toast.error("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    loading.startLoading(); // Start loading before API call
    try {
      const response = await loginFetch(registerUser);
      
      if (response.status === 200) {
        console.log(response)
        toast.success(response.message);
        response.data && login(response.data, response.meta)
        router.push(path.HOME)
        // Handle successful login
      } else {
        console.log("Another message")
        toast.error(response.message || "Login failed!");
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Login failed! Please try again");
    } finally {
      loading.stopLoading();
    }
  };


  return (
    <div className="flex w-screen  h-screen relative overflow-hidden">
      {/* Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-white p-10 dark:bg-black relative pl-10">
        <h2 className="text-4xl font-bold mb-8">Welcome Back!</h2>

        <form className="w-80 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {/* Username Input */}
          <div className="mb-2">
            <Input
              className="max-w-xs "
              label="Username"
              placeholder="Enter your username"
              type="email"
              variant="bordered"
              // onChange={(e) => setUsername(e.target.value)}
              {...register('email')}
            />
          </div>

          {/* Password Input */}
          <div className="mt-4 relative">
            <Input
              {...register('password')}
              className="max-w-xs mb-2 rounded-full"
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="p-1 rounded-full focus:outline-none bg-gray-50 hover:bg-gray-200 transition"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEye className="w-5 h-5 text-gray-500" />
                  ) : (
                    <FaEyeSlash className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              }
              label="Password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
            />
          </div>

          {/* Hiển thị lỗi nếu có */}

          {/* Register link */}
          <p className="text-center mt-4 text-sm">
            Contact administrator for more information ?{" "}
            <a
              href=""
              className="font-bold text-[#212D2D] hover:text-[#739A96]"
            >
              Administrator
            </a>
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-[#294646] text-white rounded-[15px] text-lg font-medium hover:bg-[#212D2D]"
          >
            Login
          </button>
        </form>

        {/* Decorative Elements */}
        <div className="absolute bottom-11 left-1 w-72 h-24 bg-[#739A96] opacity-20 rounded-full transform rotate-[-30deg]"></div>
        <div className="absolute bottom-10 left-8 w-96 h-28 bg-[#B2D1CE] opacity-40 rounded-full transform rotate-[-30deg]"></div>
      </div>

      {/* Right Side */}
      <div className="sm:w-1/2 bg-[#294646]"></div>
    </div>
  );
};

export default Login;

