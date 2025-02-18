enum ERole {
  ceo = "ceo",
  admin = "admin",
  user = "user",
}
interface IUser {
  _id?: string;
  username: string;
  email?: string;
  role?: ERole;
  password?: string;
  confirm?: string;
  phoneNumber: string;
  country: string;
  address: string;
  city: string;
  carts?: string[];
  reviews?: string[];
  payments?: string[];
}

interface IRoomType {
  _id: string;
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
  _id: string;
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
  _id: string;
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
  _id: string;
  title: string;
  price: number;
  extensions: string[];
  typeDescription: string;
}

interface IForm {
  _id?: string | null;
  open: boolean;
  type?: string;
  onClose: (value: boolean) => void;
}

export { ERole };
export type { IRoom, IRoomType, IUser, IForm, IOption, ICart };
