export type IUser = {
  _id?: string,
  userName?: string,
  password?: string,
  email: string,
  phone?: string,
  fullName: string,
  status?: string,
  role?: string | number,
  createAt?: string,
  updateAt?: string,
  imageUrl?: string
}

export const mockUsers: IUser[] = [
  {
    _id: "user_001",
    userName: "john_doe",
    password: "hashed_password_123",
    email: "john.doe@example.com",
    phone: "+1234567890",
    fullName: "John Doe",
    status: "active",
    role: "admin",
    createAt: "2024-02-01T12:00:00Z",
    updateAt: "2024-02-10T15:30:00Z",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    _id: "user_002",
    userName: "jane_smith",
    password: "hashed_password_456",
    email: "jane.smith@example.com",
    phone: "+1987654321",
    fullName: "Jane Smith",
    status: "inactive",
    role: "user",
    createAt: "2023-11-20T09:45:00Z",
    updateAt: "2024-01-05T10:20:00Z",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    _id: "user_003",
    userName: "michael_brown",
    password: "hashed_password_789",
    email: "michael.brown@example.com",
    phone: "+1122334455",
    fullName: "Michael Brown",
    status: "pending",
    role: "moderator",
    createAt: "2024-01-15T14:10:00Z",
    updateAt: "2024-02-12T08:50:00Z",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    _id: "user_004",
    userName: "emily_wilson",
    password: "hashed_password_987",
    email: "emily.wilson@example.com",
    phone: "+1654321876",
    fullName: "Emily Wilson",
    status: "active",
    role: "user",
    createAt: "2023-12-05T17:30:00Z",
    updateAt: "2024-02-14T11:00:00Z",
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    _id: "user_005",
    userName: "david_jones",
    password: "hashed_password_654",
    email: "david.jones@example.com",
    phone: "+1543789621",
    fullName: "David Jones",
    status: "banned",
    role: "user",
    createAt: "2023-10-10T08:00:00Z",
    updateAt: "2024-01-01T16:45:00Z",
    imageUrl: "https://randomuser.me/api/portraits/men/5.jpg"
  }
];
