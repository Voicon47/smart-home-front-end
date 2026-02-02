import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IPzemData } from "../models/Common.model";

type PzemDataProps = {
    dataPzem: IPzemData
};

const PzemMonitor = ({ dataPzem }: PzemDataProps) => {
    return (
        <div className="w-full max-w-md p-4 bg-white rounded-2xl shadow-lg">
            {/* Grid 2 cột */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                    <div>
                        <p className="text-gray-400 text-sm">Điện áp</p>
                        <p className="text-red-500 text-2xl font-semibold">{dataPzem.voltage}V</p>
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm">Dòng điện</p>
                        <p className="text-blue-500 text-2xl font-semibold">{dataPzem.current}A</p>
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm">Tần số</p>
                        <p className="text-gray-500 text-xl font-medium">{dataPzem.frequency}Hz</p>
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm">Hệ số công suất</p>
                        <p className="text-gray-500 text-xl font-medium">{dataPzem.pf}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between">
                    <p className="text-gray-400 text-sm">Công suất</p>
                    <div className="flex justify-center items-center w-full">
                        <div className="relative w-40 h-24 mt-4 overflow-hidden">
                            <CircularProgressbar
                                value={(dataPzem.power / 26000) * 100}
                                text={`${dataPzem.power.toFixed(1)}W`}
                                circleRatio={0.5}
                                styles={buildStyles({
                                    rotation: 0.75,
                                    strokeLinecap: "round",
                                    trailColor: "#e5e7eb",
                                    pathColor: "#2269c5",
                                    textColor: "#2269c5",
                                    textSize: "16px",
                                })}
                            />
                        </div>
                    </div>

                    <div className="text-center mt-2">
                        <p className="text-gray-400 text-sm">Tổng điện năng</p>
                        <p className="text-green-600 text-xl font-semibold">{dataPzem.energy} kWh</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PzemMonitor;