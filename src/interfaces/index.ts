interface IRoom {
  id: number;
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
    idType: string;
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

interface IForm {
  id?: string | null;
  open: boolean;
  type?: string;
  onClose: (value: boolean) => void;
}

export type { IRoom, IForm };
