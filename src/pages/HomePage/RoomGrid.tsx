
import { useState } from "react"
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { Chip } from "@nextui-org/chip"
import { Switch } from "@nextui-org/switch"
import {
  Bed,
  Sofa,
  ChefHat,
  Bath,
  Car,
  Lightbulb,
  Thermometer,
  Volume2,
  Wifi,
  ChevronDown,
  ChevronUp,
  Zap,
  Activity,
} from "lucide-react"
import { useRouter } from "../../hooks/use-router"

interface Device {
  id: string
  name: string
  type: "light" | "thermostat" | "speaker" | "security"
  status: "on" | "off"
  value?: string
  icon: any
}

interface Room {
  id: string
  name: string
  icon: any
  deviceCount: number
  activeDevices: number
  temperature: string
  energyUsage: string
  lastActivity: string
  securityStatus: string
  devices: Device[]
}

export function RoomGrid() {
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null)
  const [devices, setDevices] = useState<Record<string, boolean>>({
    "living-light-1": true,
    "living-light-2": false,
    "living-thermostat": true,
    "living-speaker": true,
    "bedroom-light-1": false,
    "bedroom-thermostat": true,
    "kitchen-light-1": true,
    "kitchen-light-2": true,
    "bathroom-light-1": false,
    "garage-security": true,
  })

  const rooms: Room[] = [
    {
      id: "living-room",
      name: "Living Room",
      icon: Sofa,
      deviceCount: 4,
      activeDevices: 3,
      temperature: "72°F",
      energyUsage: "2.4 kWh",
      lastActivity: "2 min ago",
      securityStatus: "Secure",
      devices: [
        { id: "living-light-1", name: "Main Lights", type: "light", status: "on", icon: Lightbulb },
        { id: "living-light-2", name: "Accent Lights", type: "light", status: "off", icon: Lightbulb },
        { id: "living-thermostat", name: "Thermostat", type: "thermostat", status: "on", value: "72°F", icon: Thermometer },
        { id: "living-speaker", name: "Smart Speaker", type: "speaker", status: "on", icon: Volume2 },
      ],
    },
    {
      id: "bedroom",
      name: "Bedroom",
      icon: Bed,
      deviceCount: 2,
      activeDevices: 1,
      temperature: "68°F",
      energyUsage: "0.8 kWh",
      lastActivity: "15 min ago",
      securityStatus: "Secure",
      devices: [
        { id: "bedroom-light-1", name: "Bedroom Lights", type: "light", status: "off", icon: Lightbulb },
        { id: "bedroom-thermostat", name: "Thermostat", type: "thermostat", status: "on", value: "68°F", icon: Thermometer },
      ],
    },
    {
      id: "kitchen",
      name: "Kitchen",
      icon: ChefHat,
      deviceCount: 2,
      activeDevices: 2,
      temperature: "70°F",
      energyUsage: "1.2 kWh",
      lastActivity: "5 min ago",
      securityStatus: "Secure",
      devices: [
        { id: "kitchen-light-1", name: "Ceiling Lights", type: "light", status: "on", icon: Lightbulb },
        { id: "kitchen-light-2", name: "Under Cabinet", type: "light", status: "on", icon: Lightbulb },
      ],
    },
    {
      id: "bathroom",
      name: "Bathroom",
      icon: Bath,
      deviceCount: 1,
      activeDevices: 0,
      temperature: "69°F",
      energyUsage: "0.1 kWh",
      lastActivity: "1 hour ago",
      securityStatus: "Secure",
      devices: [{ id: "bathroom-light-1", name: "Bathroom Lights", type: "light", status: "off", icon: Lightbulb }],
    },
    {
      id: "garage",
      name: "Garage",
      icon: Car,
      deviceCount: 1,
      activeDevices: 1,
      temperature: "65°F",
      energyUsage: "0.3 kWh",
      lastActivity: "30 min ago",
      securityStatus: "Active",
      devices: [{ id: "garage-security", name: "Security Camera", type: "security", status: "on", icon: Wifi }],
    },
  ]

  const toggleDevice = (deviceId: string) => {
    setDevices((prev) => ({
      ...prev,
      [deviceId]: !prev[deviceId],
    }))
  }

  const toggleRoom = (roomId: string) => {
    setExpandedRoom(expandedRoom === roomId ? null : roomId)
  }

  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Rooms</h2>
        <Chip variant="flat" color="default" className="text-sm">
          {rooms.reduce((acc, room) => acc + room.activeDevices, 0)} devices active
        </Chip>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="hover:shadow-lg transition-all duration-200"
            isPressable
            onPress={() => router.push(`rooms/${room.id}`)}>
            <CardHeader className="flex justify-between items-center pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <room.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                  <p className="text-sm text-default-500">
                    {room.activeDevices} of {room.deviceCount} active
                  </p>
                </div>
              </div>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => toggleRoom(room.id)}
              >
                {expandedRoom === room.id ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>

            <CardBody className="pt-0">
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-default-500">Temperature</p>
                    <p className="text-sm font-medium">{room.temperature}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-xs text-default-500">Energy</p>
                    <p className="text-sm font-medium">{room.energyUsage}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-xs text-default-500">Last Activity</p>
                    <p className="text-sm font-medium">{room.lastActivity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-xs text-default-500">Security</p>
                    <p className="text-sm font-medium">{room.securityStatus}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1">
                  {room.devices.slice(0, 3).map((device, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${devices[device.id] ? "bg-primary" : "bg-default-200"}`}
                    />
                  ))}
                  {room.devices.length > 3 && (
                    <span className="text-xs text-default-500 ml-1">+{room.devices.length - 3}</span>
                  )}
                </div>
                <Chip
                  size="sm"
                  color={room.activeDevices > 0 ? "primary" : "default"}
                  variant="flat"
                >
                  {room.activeDevices > 0 ? "Active" : "Inactive"}
                </Chip>
              </div>

              {/* Devices */}
              {expandedRoom === room.id && (
                <div className="space-y-3 border-t pt-4">
                  {room.devices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <device.icon className="h-4 w-4 text-default-500" />
                        <div>
                          <p className="text-sm font-medium">{device.name}</p>
                          {device.value && (
                            <p className="text-xs text-default-500">{device.value}</p>
                          )}
                        </div>
                      </div>
                      <Switch
                        size="sm"
                        isSelected={devices[device.id] || false}
                        onValueChange={() => toggleDevice(device.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
