export type IRoom = {
  _id: string,
  name: string,
  homeName: string,
  status: string,
}
export const mockRooms: IRoom[] = [
  {
    _id: "room_001",
    name: "Living Room",
    homeName: "home_123",
    status: "normal",
  },
  {
    _id: "room_002",
    name: "Kitchen",
    homeName: "home_123",
    status: "warning",
  },
  {
    _id: "room_003",
    name: "Bedroom",
    homeName: "home_123",
    status: "normal",
  },
  {
    _id: "room_004",
    name: "Garage",
    homeName: "home_123",
    status: "danger",
  },
  {
    _id: "room_005",
    name: "Office",
    homeName: "home_456",
    status: "normal",
  },
  {
    _id: "room_006",
    name: "Bathroom",
    homeName: "home_456",
    status: "warning",
  },
  {
    _id: "room_007",
    name: "Basement",
    homeName: "home_789",
    status: "danger",
  },
];