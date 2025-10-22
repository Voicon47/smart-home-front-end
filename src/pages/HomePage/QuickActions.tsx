"use client"

import { Card, CardBody } from "@nextui-org/card"
import { Home, Lightbulb, Thermometer, Shield } from "lucide-react"
import { useRouter } from "../../hooks/use-router";

export function QuickActions() {
  const actions = [
    {
      icon: Home,
      label: "All Devices",
      count: "12 active",
      color: "bg-primary",
    },
    {
      icon: Lightbulb,
      label: "Lighting",
      count: "8 on",
      color: "bg-secondary",
    },
    {
      icon: Thermometer,
      label: "Climate",
      count: "72°F",
      color: "bg-success",
    },
    {
      icon: Shield,
      label: "Security",
      count: "Armed",
      color: "bg-danger",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Card
          key={index}
          isPressable
          className="hover:shadow-lg transition-shadow cursor-pointer"
        >
          <CardBody className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`${action.color} p-2 rounded-lg`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{action.label}</p>
                <p className="text-xs text-default-500">{action.count}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
