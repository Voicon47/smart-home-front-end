import { useEffect, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { PiFanFill } from "react-icons/pi";
export type IDeviceData = {
  type: string,
  status: string | null
  id: string
  name: string

}

type DeviceDataProps = {
  data: IDeviceData
  onToggleChange: (deviceId: string, isOn: boolean) => void; // Callback prop
}
function DeviceCard(props: DeviceDataProps) {
  const [isDeviceOn, setIsDeviceOn] = useState<boolean>(false);
  // const [name, setName] = useState<string>("Device")
  // const [icon, setIcon] = useState<JSX.Element>()

  // const handleToggleSensor = () => setisDeviceOn((prevState) => !prevState);
  const handleToggleChange = () => {
    const newState = !isDeviceOn;
    setIsDeviceOn(newState);
    // Notify parent of toggle change
    props.onToggleChange(props.data.id, newState);
  };

  const renderIcon = (): JSX.Element => {
    switch (props.data.type) {
      case "LIGHT":
        return <FaRegLightbulb className={isDeviceOn ? "text-white" : "text-primary"} size={33} />
      case "FAN":
        return <PiFanFill className={isDeviceOn ? "text-white" : "text-primary"} size={33} />
      default:
        return <span className="text-primary">?</span>;
    }
  };
  useEffect(() => {
    switch (props.data.type) {
      case "LIGHT":
        // setName("LIGHT")
        setIsDeviceOn(props.data.status === "on" ? true : false);
        break;
      case "FAN":
        // setName("FAN")
        setIsDeviceOn(props.data.status === "on" ? true : false);
        break
      default:

        break
    }
  }, [props.data])
  // Dynamic styles
  const containerClasses = ` flex-none rounded-[30px] border-[#1b4208] border-1 px-[20px] py-[10px] flex flex-col justify-between items-start w-full h-[140px] relative shadow-sm hover:shadow-lg transition-all duration-300 ${isDeviceOn ? "bg-[#294646]" : "bg-white"
    }`;
  const textColor = isDeviceOn ? "text-white" : "text-black";
  const switchBg = isDeviceOn ? "bg-white" : "bg-[rgba(41,70,70,0.4)]";
  const switchKnobClasses = `absolute left-1 top-[2px] w-3.5 h-3.5 rounded-full shadow-md transition-transform duration-300 ${isDeviceOn ? "transform translate-x-3 bg-[#294646]" : "bg-white"
    }`;

  return (
    <div className={containerClasses}>
      {/* Sensor Status */}
      <div className="">
        <span className={`font-medium text-sm ${textColor}`}>
          {isDeviceOn ? "ON" : "OFF"}
        </span>
      </div>

      {/* Icon and Label */}
      <div className=" flex flex-col items-start">
        <div className="w-12 h-12 flex items-center mb-[4px] text-[32px]">
          {renderIcon()}
        </div>
        <h3 className={`text-sm font-semibold mb-[30px] ${textColor}`}>{props.data.name || "DEVICE"}</h3>
      </div>

      {/* Toggle Switch */}
      <div className="absolute top-[12px] right-[20px]">
        <label className="relative inline-block w-8 h-5">
          <input
            type="checkbox"
            className="sr-only"
            checked={isDeviceOn}
            onChange={handleToggleChange}
            aria-label="Toggle sensor"
          />
          <span className={`block w-full h-full rounded-full transition-all duration-300 ${switchBg}`} />
          <span className={switchKnobClasses} />
        </label>
      </div>
    </div>
  );
};

export default DeviceCard;
