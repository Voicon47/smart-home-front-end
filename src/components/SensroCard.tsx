import { useEffect, useState } from "react";
import { FaTemperatureHigh } from "react-icons/fa";

// import { GiGasMask } from "react-icons/gi";
import { IoIosFlame } from "react-icons/io";
import { MdOutlineAir } from "react-icons/md";

export type ISensorDataCard = {
  name: string;
  type: string;
  // temperature: number | string | null;
  // humidity: number | string | null;
  // mq2: number | string | null;
  // flame: number | boolean | null;
  // pir: number | null;
  value: number | Record<string, number>;
};
type SensorDataItemProps = {
  data: ISensorDataCard
}

function SensorCard(props: SensorDataItemProps) {
  const [isSensorOn, setIsSensorOn] = useState<boolean>(false);
  // const [icon, setIcon] = useState<JSX.Element>()
  const [name, setName] = useState<string>("Device")
  const [sensorValue, setSensorValue] = useState<number | string | null | boolean>("")
  const [unit, setUnit] = useState<string>("")
  // const [status, setStatus] = useState<boolean>(false)
  const handleToggleSensor = () => setIsSensorOn((prevState) => !prevState);

  // Dynamically determine icon
  const renderIcon = (): JSX.Element => {
    switch (props.data.type) {
      case "DHT11":
        return <FaTemperatureHigh className={isSensorOn ? "text-white" : "text-primary"} size={33} />;
      case "MQ2":
        return <MdOutlineAir className={isSensorOn ? "text-white" : "text-primary"} size={33} />;
      case "FLAME":
        return <IoIosFlame className={isSensorOn ? "text-white" : "text-primary"} size={33} />;
      default:
        return <IoIosFlame className={isSensorOn ? "text-white" : "text-primary"} size={33} />;
    }
  };

  useEffect(() => {
    const { type, value } = props.data;

    // Update based on sensor type
    switch (type) {
      case "DHT11":
        setName("DHT11");
        setSensorValue(typeof value === 'object' ? value.temperature : '-');
        setUnit(value ? "°C" : "");
        setIsSensorOn(!!value);
        break;
      case "MQ2":
        setName("MQ-2");
        setSensorValue(typeof value === 'number' ? value : '-');
        setUnit(value ? "PPM" : "");
        setIsSensorOn(!!value);
        break;
      case "FLAME":
        setName("FLAME");
        console.log(value)
        setSensorValue(
          typeof value !== "number" ? "" : value == 1 ? "Detected" : "Not Detected"
        );
        setUnit("");
        setIsSensorOn(value != null);
        break;
      default:
        setName("Unknown");
        setSensorValue("");
        setUnit("");
        setIsSensorOn(false);
    }
  }, [props.data]);

  // Dynamic classes for styling
  const containerClasses = `flex-none rounded-[30px] border-[#1b4208] border-1 p-[20px] flex flex-col justify-between items-center w-full  h-[140px] relative shadow-sm hover:shadow-lg transition-all duration-300 ${isSensorOn ? "bg-[#294646]" : "bg-white"
    }`;
  // setIcon(<PiFanFill  className={isSensorOn ? "text-white" : "text-primary"} size={33} />)
  const textColor = isSensorOn ? "text-white" : "text-black";
  const ppmColor = isSensorOn ? "text-white" : "text-emerald-700";
  const switchBg = isSensorOn ? "bg-white" : "bg-[rgba(41,70,70,0.4)]";
  const knobClasses = `absolute left-1 top-[2px] w-3.5 h-3.5 rounded-full shadow-md transition-transform duration-300 ${isSensorOn ? "transform translate-x-3 bg-[#294646]" : "bg-white"
    }`;

  return (
    <div className={containerClasses}>
      {/* Sensor Status */}
      <div className="absolute top-[10px] left-[20px]">
        <span className={`font-medium text-sm ${textColor}`}>
          {isSensorOn ? "ON" : "OFF"}
        </span>
      </div>

      {/* Icon, Label, and Output */}
      <div className="absolute top-[30px] left-[20px] flex flex-col items-start">
        <div className="w-12 h-12 flex items-center mb-[4px] text-[32px]">
          {/* <PiFanFill  className={isSensorOn ? "text-white" : "text-primary"} size={33} /> */}
          {renderIcon()}
        </div>
        <h2 className={`font-semibold text-sm ${textColor}`}> {name} </h2>
        {isSensorOn && <span className={`text-lg font-bold mt-[4px] ${ppmColor}`}>{sensorValue} {unit}</span>}

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
          <span className={knobClasses} />
        </label>
      </div>
    </div>
  );
};

export default SensorCard;
