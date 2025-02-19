export type IRoom = {
    _id: string,
    name: string,
    homeId: string,
    status: string,
}
export const mockRooms: IRoom[] = [
    {
      _id: "room_001",
      name: "Living Room",
      homeId: "home_123",
      status: "normal",
    },
    {
      _id: "room_002",
      name: "Kitchen",
      homeId: "home_123",
      status: "warning",
    },
    {
      _id: "room_003",
      name: "Bedroom",
      homeId: "home_123",
      status: "normal",
    },
    {
      _id: "room_004",
      name: "Garage",
      homeId: "home_123",
      status: "danger",
    },
    {
      _id: "room_005",
      name: "Office",
      homeId: "home_456",
      status: "normal",
    },
    {
      _id: "room_006",
      name: "Bathroom",
      homeId: "home_456",
      status: "warning",
    },
    {
      _id: "room_007",
      name: "Basement",
      homeId: "home_789",
      status: "danger",
    },
  ];