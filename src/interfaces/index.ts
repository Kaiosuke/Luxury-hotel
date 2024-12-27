interface IRoomTypes {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  quantity: number;
  description: string;
  quickDes: string[];
  features: string[];
  square: string;
  typeBed: string;
  sleeps: 3;
  images: string[];
  map: string;
  detailFeatures: string[];
  shortDes: string;
  detailDes: string;
}
interface IRooms {
  id: string;
  roomTypeId: string;
  roomNumber: string;
  floor: number;
  status: string;
  bookedDates: string[];
}

enum ERole {
  ceo = "ceo",
  admin = "admin",
  user = "user",
}

interface IUser {
  id?: string;
  username: string;
  email: string;
  role?: ERole;
  password: string;
  confirm?: string;
  accessToken?: string;
}

interface IForm {
  id?: string | null;
  open: boolean;
  type?: string;
  onClose: (value: boolean) => void;
}

export { ERole };
export type { IRooms, IRoomTypes, IUser, IForm };
