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
  thumbnail: string;
  title: string;
  price: number;
  quantity: number;
  rate: number;
  categoryRoomId: {
    _id: string;
    title: string;
  };
  viewId: {
    _id: string;
    title: string;
  };

  description: string;
  quickDes: string[];
  features: string[];
  square: string;
  typeBedId: {
    _id: string;
    title: string;
  };
  sleeps: number;
  images: string[];
  map: string;
  detailFeatures: string[];
  shortDes: string;
  detailDes: string;
}

interface IRoom {
  _id: string;
  title?: string;
  roomTypeId: string;
  roomNumber: string;
  floor: number;
  status: string;
  bookedDates: { from: Date; to: Date }[];
  roomType?: {
    title: string;
  };
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
  _id?: string;
  title: string;
  foodId: {
    _id: string;
    title: string;
  };

  carts?: any;
  price: number;
  extension: string;
  typeDescription: string;
}

interface IForm {
  _id?: string | null;
  open: boolean;
  type?: string;
  onClose: (value: boolean) => void;
}

interface ITypeBed {
  _id?: string;
  title: string;
  roomTypes: any;
}

interface IView {
  _id?: string;
  title: string;
  roomTypes: any;
}

interface ICategoryRoom {
  _id?: string;
  title: string;
  roomTypes: any;
}

interface IFood {
  _id?: string;
  title: string;
  options: any;
}

interface IPayment {
  _id: string;
  userId: string;
  cartId: string;
  paymentMethod: string;
}

interface IReview {
  _id: string;
  userId: string;
  roomTypeId: string;
  description: string;
}

export { ERole };
export type {
  IRoom,
  IRoomType,
  IUser,
  IForm,
  IOption,
  ICart,
  ITypeBed,
  IView,
  ICategoryRoom,
  IFood,
  IPayment,
  IReview,
};
