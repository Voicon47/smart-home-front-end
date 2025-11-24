// import React from "react";
import { RiHomeWifiFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdArrowDropright } from "react-icons/io";
import { Spinner } from "@nextui-org/react";

interface HomeCardProps {
  name: string,
  location: string,
  active: boolean;
  room: number;
  user: number;
  energy: number;
  devices?: string[];
}

function HomeCard({ name, location, active, room, user, energy, devices = [] }: HomeCardProps) {
  return (
    <>
      <div className="w-[350px] h-full p-4 rounded-[20px] shadow-md bg-white hover:shadow-xl transition">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center gap-2">
            <RiHomeWifiFill className="text-gray-600" size={26} />
            <h2 className="font-semibold text-lg">{name}</h2>
          </div>

          <button className="flex items-center bg-background text-gray-600 font-medium text-xs gap-0.5">
            <span>View</span>
            <IoMdArrowDropright size={12} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm space-y-2">
          <FaLocationDot className="text-gray-600" size={16} />
          <p>{location}</p>
        </div>
        <div className="mt-2 text-left space-y-2">
          <p
            className={`font-medium ${active ? "text-green-600" : "text-red-600"
              }`}
          >
            ● {active ? "Active" : "Inactive"}
          </p>
          <p className="text-orange-600 font-medium">
            {room} Rooms - {user} Users
          </p>
          {!energy ? (
            <Spinner />
          ) : (
            <p className="font-bold text-lg">
              Energy (Kwh): <span className="text-black">{energy}</span>
            </p>
          )}

        </div>
        <div className="flex gap-2 mt-4">
          {devices.map((device, index) => (
            <button key={index} className="bg-gray-200 px-4 py-2 rounded-full">
              {device}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeCard;