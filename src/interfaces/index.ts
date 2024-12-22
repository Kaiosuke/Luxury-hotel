interface IRooms {
  id?: number;
  thumbnail: string;
  title: string;
  quantity?: number;
  description: string;
  quickDes?: string[];
  features?: string[];
  square?: string;
  typeBed?: string;
  sleeps?: number;
  types?: {
    typeName: string;
    extensions: string[];
    price: number;
    typeDescription: string;
  }[];
  images: string[];
  map: string;
  detailFeatures?: string[];
  shortDes?: string;
  detailDes?: string;
}

export type { IRooms };
