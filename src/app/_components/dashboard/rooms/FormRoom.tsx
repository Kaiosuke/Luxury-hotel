import {
  addRoomType,
  getRoomType,
  updateRoomType,
} from "@/app/api/roomTypesRequest";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { IForm } from "@/interfaces";
import { useAppDispatch } from "@/redux/store";
import { RoomTypesSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { featureList, quickDesList, shortFeaturesList } from "@/app/data.json";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@radix-ui/react-dialog";
import { features } from "process";
import { z } from "zod";
import FormUploadImage from "./FormUploadImage";

function FormRoom({ open, onClose, id }: IForm) {
  const [category, setCategory] = useState("Normal");
  const [view, setView] = useState("Mountain");
  const [quickDes, setQuickDes] = useState<string[]>([]);
  const [shortFeatures, setShortFeatures] = useState<string[]>([]);
  const [detailFeatures, setDetailFeatures] = useState<string[]>([]);

  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailOption, setThumbnailOption] = useState("keep");

  const [mapUrl, setMapUrl] = useState("");
  const [mapOption, setMapOption] = useState("keep");

  // const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  // const [imagesOption, setImageOption] = useState("keep");

  type FormValues = z.infer<typeof RoomTypesSchema>;

  const { register, formState, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(RoomTypesSchema),
    defaultValues: {
      thumbnail: "",
      title: "",
      price: 0,
      quantity: 0,
      rate: 0,
      description: "",
      square: "",
      typeBed: "",
      sleeps: 0,
      images: [],
      map: "",
      shortDes: "",
      detailDes: "",
    },
  });

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      (async () => {
        const roomType = await dispatch(getRoomType(id)).unwrap();

        reset(roomType);
        roomType.quickDes && setQuickDes(roomType.quickDes);
        roomType.features && setShortFeatures(roomType.features);
        roomType.detailFeatures && setDetailFeatures(roomType.detailFeatures);
        roomType.category && setCategory(roomType.category);
        roomType.view && setView(roomType.view);
        roomType.thumbnail && setThumbnailUrl(roomType.thumbnail);
        roomType.map && setMapUrl(roomType.map);
        // roomType.images && setImagesUrl(roomType.images);
      })();
    }
  }, [id]);

  const VITE_UPLOAD_PRESET = "kaiosuke";
  const VITE_CLOUD_NAME = "dyjvnhq5s";

  const uploadImage = async (file: string | Blob) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_UPLOAD_PRESET);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    return data.secure_url;
  };

  // const uploadImages = async (files: FileList | null) => {
  //   if (!files) return [];

  //   const fileUrls = await Promise.all(
  //     Array.from(files).map(async (file) => {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       formData.append("upload_preset", VITE_UPLOAD_PRESET);

  //       const response = await fetch(
  //         `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );

  //       const data = await response.json();
  //       return data.secure_url;
  //     })
  //   );

  //   return fileUrls;
  // };

  const handleQuickDes = (value: string) => {
    const exist = quickDes.includes(value);
    if (exist) {
      setQuickDes((prev) => {
        return prev.filter((data) => data !== value);
      });
    } else {
      setQuickDes((prev) => {
        return [...prev, value];
      });
    }
  };

  const handleShortFeatures = (value: string) => {
    const exist = shortFeatures.includes(value);
    if (exist) {
      setShortFeatures((prev) => {
        return prev.filter((data) => data !== value);
      });
    } else {
      setShortFeatures((prev) => {
        return [...prev, value];
      });
    }
  };

  const handleDetailFeatures = (value: string) => {
    const exist = detailFeatures.includes(value);
    if (exist) {
      setDetailFeatures((prev) => {
        return prev.filter((data) => data !== value);
      });
    } else {
      setDetailFeatures((prev) => {
        return [...prev, value];
      });
    }
  };

  const onSubmit = async (data: any) => {
    let updatedData = {
      ...data,
      quickDes,
      features,
      detailFeatures,
      category,
      view,
    };
    switch (thumbnailOption) {
      case "upload":
        if (data.thumbnail && data.thumbnail[0]) {
          const thumbnailUrl = await uploadImage(data.thumbnail[0]);
          updatedData = { ...updatedData, thumbnail: thumbnailUrl };
        }

        if (data.map && data.map[0]) {
          const mapUrl = await uploadImage(data.map[0]);
          updatedData = { ...updatedData, map: mapUrl };
        }

        // if (data.images) {
        //   const imagesUrls = await uploadImages(data.images);
        //   console.log(imagesUrls);
        //   updatedData = { ...updatedData, images: imagesUrls };
        // }

        break;
      default:
    }
    if (id) {
      dispatch(updateRoomType({ id, roomType: updatedData }));
      toast({
        variant: "success",
        title: "success",
        description: "Update success",
      });
    } else {
      dispatch(addRoomType(updatedData));
      toast({
        variant: "success",
        title: "success",
        description: "Add has been added to cart",
      });
    }

    // return onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[1200px] sm:max-w-[600px] h-[90%] overflow-auto  bg-sidebar-four text-sidebar-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl">
            {id ? "Update" : "Add"} RoomType
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="grid  gap-2 py-2">
            <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
              <div className="">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("title")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.title?.message}
                </span>
              </div>
              <div className="">
                <Label htmlFor="typeBed" className="text-right">
                  Type Bed
                </Label>
                <Input
                  id="typeBed"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("typeBed")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.typeBed?.message}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
              <div className="">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="h-[100px]"
                  {...register("description")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.description?.message}
                </span>
              </div>
              <div className="">
                <Label htmlFor="shortDes" className="text-right">
                  Short Des
                </Label>
                <Textarea
                  id="shortDes"
                  className="h-[100px]"
                  {...register("shortDes")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.shortDes?.message}
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 grid-cols-1 md:py-4">
              <div className="">
                <Label htmlFor="detailDes" className="text-right">
                  Detail Des
                </Label>
                <Textarea
                  id="detailDes"
                  className="h-[100px]"
                  {...register("detailDes")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.detailDes?.message}
                </span>
              </div>
              <div className="">
                <Label htmlFor="square" className="text-right">
                  Square
                </Label>
                <Input
                  id="square"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("square")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.square?.message}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 grid-cols-2 md:py-4">
              <div className="">
                <Label htmlFor="price" className="text-right">
                  price
                </Label>
                <Input
                  id="price"
                  type="number"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("price", { valueAsNumber: true })}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.price?.message}
                </span>
              </div>
              <div className="">
                <Label htmlFor="quantity" className="text-right">
                  quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("quantity", { valueAsNumber: true })}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.quantity?.message}
                </span>
              </div>
              <div className="">
                <Label htmlFor="rate" className="text-right">
                  Rate
                </Label>
                <Input
                  id="rate"
                  type="number"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("rate", { valueAsNumber: true })}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.rate?.message}
                </span>
              </div>
              <div className="">
                <Label htmlFor="sleeps" className="text-right">
                  Sleeps
                </Label>
                <Input
                  id="sleeps"
                  type="number"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("sleeps", { valueAsNumber: true })}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.sleeps?.message}
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-5 gap-4 grid-cols-2 md:py-4">
              <div className="">
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <Label>Category</Label>
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar-four text-sidebar-primary ">
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Premier">Premier</SelectItem>
                    <SelectItem value="Vip">Vip</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="">
                <Select value={view} onValueChange={(value) => setView(value)}>
                  <Label>View</Label>
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar-four text-sidebar-primary ">
                    <SelectItem value="Mountain">Mountain</SelectItem>
                    <SelectItem value="Pool">Pool</SelectItem>
                    <SelectItem value="Sea">Sea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild className="mt-4">
                    <Button variant="outline">Quick Des</Button>
                  </DialogTrigger>
                  <DialogContent className="lg:max-w-[800px] sm:max-w-[420px] bg-sidebar-secondary text-sidebar-primary">
                    <DialogHeader>
                      <DialogTitle className="md:text-2xl">
                        Quick Des
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid sm:grid-cols-2 grid-cols-1 items-start w-full">
                      {quickDesList.map((des, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={"des" + index}
                            className="text-secondary"
                            checked={quickDes.includes(des)}
                            onCheckedChange={() => handleQuickDes(des)}
                          />
                          <label
                            htmlFor={"des" + index}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                          >
                            {des}
                          </label>
                        </div>
                      ))}
                    </div>
                    <DialogClose asChild>
                      <Button type="reset" variant="outline" className="w-fit">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild className="mt-4">
                    <Button variant="outline">Features</Button>
                  </DialogTrigger>
                  <DialogContent className="lg:max-w-[800px] sm:max-w-[420px] bg-sidebar-secondary text-sidebar-primary">
                    <DialogHeader>
                      <DialogTitle className="md:text-2xl">
                        Features
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid sm:grid-cols-2 grid-cols-1 items-start w-full">
                      {shortFeaturesList.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={"shortFeature" + index}
                            className="text-secondary"
                            checked={shortFeatures.includes(feature)}
                            onCheckedChange={() => handleShortFeatures(feature)}
                          />
                          <label
                            htmlFor={"shortFeature" + index}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                          >
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                    <DialogClose asChild>
                      <Button type="reset" variant="outline" className="w-fit">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild className="mt-4">
                    <Button variant="outline">Detail Features</Button>
                  </DialogTrigger>
                  <DialogContent className="lg:max-w-[800px] sm:max-w-[420px] bg-sidebar-secondary text-sidebar-primary">
                    <DialogHeader>
                      <DialogTitle className="md:text-2xl">
                        Detail Features
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid sm:grid-cols-2 grid-cols-1 items-start w-full">
                      {featureList.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={feature.id}
                            className="text-secondary"
                            checked={detailFeatures.includes(feature.title)}
                            onCheckedChange={() =>
                              handleDetailFeatures(feature.title)
                            }
                          />
                          <label
                            htmlFor={feature.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                          >
                            {feature.title}
                          </label>
                        </div>
                      ))}
                    </div>
                    <DialogClose asChild>
                      <Button type="reset" variant="outline" className="w-fit">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 grid-cols-1 mt-2">
              <FormUploadImage<FormValues>
                id={id}
                title="thumbnail"
                register={register}
                formState={formState}
                option={thumbnailOption}
                setOption={setThumbnailOption}
                url={thumbnailUrl}
                isImages={false}
              />
              <FormUploadImage<FormValues>
                id={id}
                title="map"
                register={register}
                formState={formState}
                option={mapOption}
                setOption={setMapOption}
                url={mapUrl}
                isImages={false}
              />
              {/* <FormUploadImage<FormValues>
                id={id}
                title="images"
                register={register}
                formState={formState}
                option={imagesOption}
                setOption={setImageOption}
                url={imagesUrl}
                isImages
              /> */}
            </div>
          </div>
          <Button type="submit" variant={"outline"} className="text-left">
            {id ? "Update" : "Add"} RoomType
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormRoom;
