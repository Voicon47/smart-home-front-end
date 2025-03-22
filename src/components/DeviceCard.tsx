import { useEffect, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { PiFanFill } from "react-icons/pi";
export type IDeviceData = {
  type: string,
  status: string | null
}

type DeviceDataProps = {
  data: IDeviceData
}
function DeviceCard (props : DeviceDataProps) {
  const [isSensorOn, setIsSensorOn] = useState<boolean>(false);
  const [name, setName] = useState<string>("Device") 
  // const [icon, setIcon] = useState<JSX.Element>()

  const handleToggleSensor = () => setIsSensorOn((prevState) => !prevState);

  const renderIcon = (): JSX.Element => {
    switch (props.data.type) {
      case "LIGHT":
        return <FaRegLightbulb className={isSensorOn ? "text-white" : "text-primary"} size={33} />
      case "FAN":
        return <PiFanFill className={isSensorOn ? "text-white" : "text-primary"} size={33} />
      default:
        return <span className="text-primary">?</span>;
    }
  };
  useEffect(() => {
    switch (props.data.type) {
      case "LIGHT":
        setName("LIGHT")
        setIsSensorOn(props.data.status === "on" ? true : false);
        break;
      case "FAN":
        setName("FAN")
        setIsSensorOn(props.data.status === "on" ? true : false);
        break
      default:

        break
    }
  },[props.data])
  // Dynamic styles
  const containerClasses = ` flex-none rounded-[30px] border-[#1b4208] border-1 p-[20px] flex flex-col justify-between items-center w-full h-[140px] relative shadow-sm hover:shadow-lg transition-all duration-300 ${
    isSensorOn ? "bg-[#294646]" : "bg-white"
  }`;
  const textColor = isSensorOn ? "text-white" : "text-black";
  const switchBg = isSensorOn ? "bg-white" : "bg-[rgba(41,70,70,0.4)]";
  const switchKnobClasses = `absolute left-1 top-[2px] w-3.5 h-3.5 rounded-full shadow-md transition-transform duration-300 ${
    isSensorOn ? "transform translate-x-3 bg-[#294646]" : "bg-white"
  }`;

  return (
    <div className={containerClasses}>
      {/* Sensor Status */}
      <div className="absolute top-[10px] left-[20px]">
        <span className={`font-medium text-sm ${textColor}`}>
          {isSensorOn ? "ON" : "OFF"}
        </span>
      </div>

      {/* Icon and Label */}
      <div className="absolute top-[30px] left-[10px] flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center mb-[4px] text-[32px]">
          {renderIcon()}
        </div>
        <h3 className={`text-sm font-semibold mb-[30px] ${textColor}`}>{name}</h3>
      </div>

      {/* Toggle Switch */}
      <div className="absolute top-[12px] right-[20px]">
        <label className="relative inline-block w-8 h-5">
          <input
            type="checkbox"
            className="sr-only"
            checked={isSensorOn}
            onChange={handleToggleSensor}
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
