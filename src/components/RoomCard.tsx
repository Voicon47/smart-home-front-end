import { Spinner } from "@nextui-org/react";
import React from "react";
import { useRouter } from "../hooks/use-router";
import { path } from "../routes/Path";

type RoomCardProps = {
  name: string;
  userName: string
  status: string;
  energy: number;
  image?: string;
};

const RoomCard: React.FC<RoomCardProps> = ({ name, userName, status, energy, image }) => {
  const router = useRouter();
  return (
    <>
      <div
        className="flex flex-row rounded-2xl p-3 w-[200px] md:w-[270px] h-[180px] bg-primary text-white 
                 hover:shadow-2xl transition-shadow duration-300"
        onClick={() => router.push(path.ADMIN.DETAIL_ROOM)}
      >
        <img
          src={
            image ||
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/488066775.jpg?k=624c3f5d623f9b33fe6cb9b2782d96b41f625a2bc7d325ae1e8e4ad1149012e8&o=&hp=1"
          }
          alt="room-image"
          className="rounded-[10px] w-[120px]  object-cover mr-4"
        />
        <div className="flex flex-col justify-start items-start text-start ml-[5px]">
          <p className="w-[100px] text-lg font-medium mt-1 truncate">{name}</p>
          <p className="w-[100px] text-md font-semibold text-gray-300  truncate">{userName}</p>
          {!energy ? (
            <Spinner color="default" />
          ) : (
            <>
              <p className="w-[100px] text-xs font-medium text-gray-300 mt-2">{`Energy: ${energy}`}</p><p
                className={`font-bold text-lg mt-12 ${status ? "text-orange-500" : "text-red-500"}`}
              >
                ● {status ? "Normal" : "Danger"}
              </p>
            </>
          )}
          {/* <p className="w-[100px] text-xs font-medium text-gray-300 mt-2">{`Energy: ${energy}`}</p>
        <p
          className={`font-bold text-lg mt-12 ${
            status ? "text-orange-500" : "text-red-500"
          }`}
        >
          ● {status ? "Warning" : "Danger"}
        </p> */}
          {/* <p className="text-xl font-bold mt-14">${price}</p> */}
        </div>
      </div>
    </>
  );
};

export default RoomCard;
