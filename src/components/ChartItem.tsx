import React, { useState, useEffect, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { RxCaretRight } from "react-icons/rx";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";

import zoomPlugin from "chartjs-plugin-zoom";
import { mockData } from "./mockData";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const MAX_POINTS = 24; // Max points for real-time mode

type ChartItemProps = {
  labels: number[]
  data: number[]
}
function ChartItem(props : ChartItemProps){
  // const [currentData, setCurrentData] = useState(mockData.daily);
  // const [, setMenuOpen] = useState(false);
  // const [realTime, setRealTime] = useState(false);
  // const [zoomRange, setZoomRange] = useState<number[]>([0, 12]);
  // const [paused, setPaused] = useState(false);
  const [selectedKeys, setSelectedKey] = React.useState("Options");
  // console.log(props.data)
  // Capitalize function for dynamic menu items
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  console.log("Chart")
  // console.log(currentData)
  // useEffect(() => {
  //   if (!realTime) return;

  //   const interval = setInterval(() => {
  //     setCurrentData((prevData) => {
  //       const now = new Date();
  //       const newTime = now.toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //         second: "2-digit",
  //       });
  //       const newTemperature = parseFloat((20 + Math.random() * 10).toFixed(1));
  //       const newHumidity = parseFloat((50 + Math.random() * 20).toFixed(1));

  //       const updatedLabels = [...prevData.labels, newTime].slice(-MAX_POINTS);
  //       const updatedTemperature = [
  //         ...prevData.temperature,
  //         newTemperature,
  //       ].slice(-MAX_POINTS);
  //       const updatedHumidity = [...prevData.humidity, newHumidity].slice(
  //         -MAX_POINTS
  //       );

  //       if (!paused) {
  //         setZoomRange([
  //           Math.max(0, updatedLabels.length - 12),
  //           updatedLabels.length,
  //         ]);
  //       }

  //       return {
  //         labels: updatedLabels,
  //         temperature: updatedTemperature,
  //         humidity: updatedHumidity,
  //       };
  //     });
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [realTime, paused]);

  // Change data type
  // const handleDataChange = useCallback(
  //   (
  //     type: "daily" | "weekly" | "monthly" | "yearly" | "realTime",
  //   ) => {
  //     // setMenuOpen(false);
  //     setSelectedKey(capitalize(type));
  //     if (type === "realTime") {
  //       setRealTime(true);
  //       const now = new Date();
  //       const initialData = Array.from({ length: MAX_POINTS }, (_, i) => {
  //         const time = new Date(now.getTime() - (MAX_POINTS - 1 - i) * 5000);
  //         return {
  //           time: time.toLocaleTimeString([], {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //             second: "2-digit",
  //           }),
  //           temperature: parseFloat((20 + Math.random() * 10).toFixed(1)),
  //           humidity: parseFloat((50 + Math.random() * 20).toFixed(1)),
  //         };
  //       });

  //       setCurrentData({
  //         labels: initialData.map((d) => d.time),
  //         temperature: initialData.map((d) => d.temperature),
  //         humidity: initialData.map((d) => d.humidity),
  //       });
  //       setZoomRange([0, 12]);
  //       setPaused(false);
  //     // } else if (type === "monthly" && month) {
  //     //   setRealTime(false);
  //     //   // setSelectedMonth(month);
  //     //   const monthData = mockData.monthly.details[month];
  //     //   setCurrentData(monthData);
  //     //   setZoomRange([0, Math.min(monthData.labels.length, 12)]);
  //     } else {
  //       setRealTime(false);
  //       setCurrentData(mockData[type]);
  //       setZoomRange([0, Math.min(mockData[type].labels.length, 12)]);
  //     }
  //   },
  //   []
  // );

  // Handle zoom (Previous/Next) logic
  // const handleZoomChange = useCallback(
  //   (direction: "next" | "prev") => {
  //     setZoomRange((prevRange) => {
  //       const offset = direction === "next" ? 12 : -12;
  //       const newStart = Math.max(0, prevRange[0] + offset);
  //       const newEnd = Math.min(currentData.labels.length, newStart + 12);

  //       if (direction === "next" && newEnd >= currentData.labels.length) {
  //         setPaused(false);
  //       } else {
  //         setPaused(true);
  //       }

  //       return [newStart, newEnd];
  //     });
  //   },
  //   [currentData.labels.length]
  // );

  // Chart data and configuration
  const combinedChartData = {
    labels: props.labels,
    datasets: [
      {
        type: "line" as const,
        label: "Temperature (°C)",
        data: props.data, // Giảm 1 điểm
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // nếu muốn thành đường thẳng thì tension = 0
        yAxisID: "y1",
      },
      {
        type: "line" as const,
        label: "Humidity (%)",
        // data: currentData.humidity.slice(zoomRange[0], zoomRange[1]), // Giảm 1 điểm
        data:[0],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4, // nếu muốn thành đường thẳng thì tension = 0
        yAxisID: "y2",
      },
    ],
  };
  // console.log(combinedChartData.datasets[0].data)
  // console.log(combinedChartData.labels)
  const chartOptions = {
    responsive: true, // thay đổi kích thước màn hình tuỳ chỉnh dựa trên dữ liệu
    plugins: {
      legend: {
        //chú thích của biểu đồ
        position: "top" as const,
        labels: {
          font: { size: 15 },
          boxWidth: 20,
          boxHeight: 0.5,
        },
      },
      title: { display: true, text: "Temperature and Humidity Chart" },
    },
    scales: {
      x: {
        title: { display: true, text: "Time" },
        ticks: { autoSkip: true, maxTicksLimit: 15 },
      },
      y1: {
        type: "linear" as const,
        position: "left" as const,
        title: { display: true, text: "Temperature (\u00B0C)" },
        ticks: { stepSize: 2, min: 15, max: 35 },
      },
      y2: {
        position: "right" as const,
        title: { display: true, text: "Humidity (%)" },
        grid: { drawOnChartArea: false },
        ticks: { stepSize: 5, min: 40, max: 80 },
      },
    },
    maintainAspectRatio: false, //Vô hiệu hóa tỷ lệ cố định của biểu đồ, cho phép biểu đồ linh hoạt theo kích thước container
  };

  return (
    <div className="p-4 bg-primary rounded-3xl shadow-lg text-black">
      <div className="relative text-right mb-4">
        <Dropdown>
          <DropdownTrigger>
            <Button className="text-white border-2 border-white" variant="bordered">
              {selectedKeys}
              <RxCaretRight className="text-lg" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Data Type Selection"
            selectedKeys={selectedKeys}
            selectionMode="single"
            onAction={(key) => { 
              setSelectedKey(capitalize(String(key)));
              // handleDataChange(
              //   key as "daily" | "weekly" | "monthly" | "realTime"| "yearly"
              // );
              
            }}
          >
            {/* Các loại menu */}
            {["daily", "weekly", "monthly", "yearly", "realTime"].map(
              (type) => (
                <DropdownItem key={type} className="capitalize text-gray-950">
                  {capitalize(type)}
                </DropdownItem>
              )
            )}
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="border bg-white/90 rounded-3xl p-2 mt-4 relative">
        {/* Biểu đồ */}
        <div className="w-full h-96">
          <Chart type="line" data={combinedChartData} options={chartOptions} />
        </div>

        {/* Nút Previous và Next */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            // disabled={zoomRange[0] === 0}
            // onClick={() => handleZoomChange("prev")}
            className="bg-gray-500 hover:bg-gray-600 text-white p-1 rounded-[20px] disabled:bg-gray-300"
          >
            <BsArrowLeftShort size={20} />
          </button>
          <button
            // disabled={zoomRange[1] >= currentData.labels.length}
            // onClick={() => handleZoomChange("next")}
            className="bg-gray-500 hover:bg-gray-600 text-white p-1 rounded-[20px] disabled:bg-gray-300"
          >
            <BsArrowRightShort size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartItem;
