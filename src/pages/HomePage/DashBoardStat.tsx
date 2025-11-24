"use client";

import { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import TVNoise from "./tvNoise";
import { Image } from "@nextui-org/react";

export interface WidgetData {
  location: string;
  timezone: string;
  temperature: string;
  weather: string;
  date: string;
}
interface WidgetProps {
  widgetData: WidgetData;
}

export default function DashBoardStat({ widgetData }: WidgetProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });

  const formatDate = (date: Date) => {
    const dayOfWeek = date.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const restOfDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return { dayOfWeek, restOfDate };
  };

  const dateInfo = formatDate(currentTime);

  return (
    <Card className="w-full aspect-[2] relative overflow-hidden">
      {/* Background Noise Effect */}
      <TVNoise opacity={0.3} intensity={0.2} speed={40} />

      <CardBody className="bg-accent/30 flex flex-col justify-between text-sm font-medium uppercase relative z-20">
        {/* Date */}
        <div className="flex justify-between items-center">
          <span className="opacity-50">{dateInfo.dayOfWeek}</span>
          <span>{dateInfo.restOfDate}</span>
        </div>

        {/* Clock */}
        <div className="text-center">
          <div className="text-5xl font-display" suppressHydrationWarning>
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Weather Info */}
        <div className="flex justify-between items-center">
          <span className="opacity-50">{widgetData.temperature}</span>
          <span>{widgetData.location}</span>

          <Chip
            variant="bordered"
            color="primary"
            className="uppercase tracking-wide"
          >
            {widgetData.timezone}
          </Chip>
        </div>

        {/* Background GIF */}
        <div className="absolute inset-0 -z-[1]">
          <Image
            src="/assets/pc_blueprint.gif"
            alt="logo"
            className="object-contain"
          />
        </div>
      </CardBody>
    </Card>
  );
}
