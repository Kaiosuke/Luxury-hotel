enum ERole {
  ceo = "ceo",
  admin = "admin",
  user = "user",
}
interface IUser {
  id?: string;
  username: string;
  email?: string;
  role?: ERole;
  password?: string;
  phoneNumber: string;
  country: string;
  address: string;
  city: string;
}

interface IRoomType {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  quantity: number;
  rate: number;
  category: string;
  view: string;
  description: string;
  quickDes: string[];
  features: string[];
  square: string;
  typeBed: string;
  sleeps: number;
  images: string[];
  map: string;
  detailFeatures: string[];
  shortDes: string;
  detailDes: string;
}

interface IRoom {
  id: string;
  roomTypeId: string;
  roomNumber: string;
  floor: number;
  status: string;
  bookedDates: { from: Date; to: Date }[];
}

export enum ECart {
  pending = "pending",
  booked = "booked",
  confirm = "confirm",
}

interface ICart {
  id: string;
  userId: string;
  roomTypeId: string;
  optionId: string;
  roomId: string;
  day: number;
  status: ECart;
  price: number;
  totalPrice: number;
  reservation?: string;
  bookedDates: { from: Date; to: Date };
}

interface IOption {
  id: string;
  title: string;
  price: number;
  extensions: string[];
  typeDescription: string;
}

interface IForm {
  id?: string | null;
  open: boolean;
  type?: string;
  onClose: (value: boolean) => void;
}

export { ERole };
export type { IRoom, IRoomType, IUser, IForm, IOption, ICart };
