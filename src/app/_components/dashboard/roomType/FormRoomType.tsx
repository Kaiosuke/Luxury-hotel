import {
  addRoomType,
  getRoomType,
  updateRoomType,
} from "@/app/api/roomTypeRequest";
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
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { featureList, quickDesList, shortFeaturesList } from "@/app/data.json";
import { Checkbox } from "@/components/ui/checkbox";
import { categoryRoomsSelector } from "@/redux/selectors/categoryRoomsSelector";
import { typeBedsSelector } from "@/redux/selectors/typeBedsSelector";
import { viewsSelector } from "@/redux/selectors/viewsSelector";
import { DialogClose } from "@radix-ui/react-dialog";
import { features } from "process";
import { useSelector } from "react-redux";
import { z } from "zod";
import FormUploadImage from "./FormUploadImage";

function FormRoomType({ open, onClose, _id }: IForm) {
  const [quickDes, setQuickDes] = useState<string[]>([]);
  const [shortFeatures, setShortFeatures] = useState<string[]>([]);
  const [detailFeatures, setDetailFeatures] = useState<string[]>([]);
  const [typeBedId, setTypeBedId] = useState<string>("");
  const [viewId, setViewId] = useState<string>("");
  const [categoryRoomId, setCategoryRoomId] = useState<string>("");

  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [thumbnailOption, setThumbnailOption] = useState("keep");

  const [mapUrl, setMapUrl] = useState("");
  const [mapOption, setMapOption] = useState("keep");

  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [imagesOption, setImageOption] = useState("keep");

  type FormValues = z.infer<typeof RoomTypesSchema>;

  const { register, formState, handleSubmit, setValue, reset } =
    useForm<FormValues>({
      resolver: zodResolver(RoomTypesSchema),
      defaultValues: {
        thumbnail: "",
        title: "",
        price: 0,
        rate: 0,
        description: "",
        square: "",
        sleeps: 0,
        images: [],
        map: "",
        shortDes: "",
        detailDes: "",
        viewId,
        categoryRoomId,
        typeBedId,
      },
    });

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (_id) {
      (async () => {
        try {
          const roomType = await dispatch(getRoomType(_id)).unwrap();
          reset({
            ...roomType,
            categoryRoomId: roomType.categoryRoomId?._id || "",
            viewId: roomType.viewId?._id || "",
            typeBedId: roomType.typeBedId?._id || "",
          });

          setQuickDes(roomType.quickDes);
          setShortFeatures(roomType.features);
          setDetailFeatures(roomType.detailFeatures);
          setCategoryRoomId(roomType.categoryRoomId?._id || "");
          setViewId(roomType.viewId?._id || "");
          setTypeBedId(roomType.typeBedId?._id || "");
          setThumbnailUrl(roomType.thumbnail);
          setMapUrl(roomType.map);
          setImagesUrl(roomType.images);
        } catch (error) {
          const errorMessage =
            typeof error === "string" ? error : "Something went wrong";
          toast({
            variant: "destructive",
            title: "Registration failed",
            description: errorMessage,
          });
        }
      })();
    }
  }, [_id]);

  useEffect(() => {
    setValue("viewId", viewId, { shouldValidate: true });
    setValue("categoryRoomId", categoryRoomId, { shouldValidate: true });
    setValue("typeBedId", typeBedId, { shouldValidate: true });
  }, [viewId, categoryRoomId, typeBedId, setValue]);

  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET!;
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;

  const uploadImage = async (file: string | Blob) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "Luxury-hotel");
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    return data.secure_url;
  };

  const uploadImages = async (files: File[]) => {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", "Luxury-hotel");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      return response.json();
    });

    const results = await Promise.all(uploadPromises);

    const imageUrls = results.map((res) => res.secure_url);

    return imageUrls;
  };

  const { views } = useSelector(viewsSelector);
  const { categoryRooms } = useSelector(categoryRoomsSelector);
  const { typeBeds } = useSelector(typeBedsSelector);

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
    let newRoomType = {
      ...data,
      quickDes,
      features,
      detailFeatures,
    };

    switch (thumbnailOption) {
      case "upload":
        if (data.thumbnail && data.thumbnail[0]) {
          const thumbnailUrl = await uploadImage(data.thumbnail[0]);
          newRoomType = { ...newRoomType, thumbnail: thumbnailUrl };
        }
        break;
      default:
    }

    switch (mapOption) {
      case "upload":
        if (data.map && data.map[0]) {
          const mapUrl = await uploadImage(data.map[0]);
          newRoomType = { ...newRoomType, map: mapUrl };
        }
        break;
      default:
    }

    switch (imagesOption) {
      case "upload":
        if (data.images && data.images.length > 0) {
          const imagesUrls = await uploadImages(Array.from(data.images));
          newRoomType = { ...newRoomType, images: imagesUrls };
        }
        break;
      default:
    }

    if (_id) {
      (async () => {
        try {
          await dispatch(
            updateRoomType({ _id, roomType: newRoomType })
          ).unwrap();
          toast({
            variant: "success",
            title: "Success",
            description: "Update Room Type success",
          });
          onClose(true);
        } catch (error) {
          const errorMessage =
            typeof error === "string" ? error : "Something went wrong";
          toast({
            variant: "destructive",
            title: "Failure",
            description: errorMessage,
          });
        }
      })();
    } else {
      try {
        await dispatch(addRoomType(newRoomType)).unwrap();

        toast({
          variant: "success",
          title: "Success",
          description: "Add Room Type success",
        });
      } catch (error) {
        const errorMessage =
          typeof error === "string" ? error : "Something went wrong";
        toast({
          variant: "destructive",
          title: "Failure",
          description: errorMessage,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[1200px] sm:max-w-[600px] h-[90%] overflow-auto  bg-sidebar-four text-sidebar-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl">
            {_id ? "Update" : "Add"} RoomType
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

            <div className="grid gap-4 grid-cols-2 md:py-4">
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
            <div className="grid md:grid-cols-3 grid-cols-2 md:py-4">
              <div className="">
                <Select
                  value={typeBedId}
                  onValueChange={(value) => {
                    setTypeBedId(value);
                    setValue("typeBedId", value, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Label>Type Bed</Label>
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar-four text-sidebar-primary ">
                    {typeBeds.map((type) => (
                      <SelectItem key={type._id} value={String(type._id)}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-red-500 text-sm">
                  {formState.errors.typeBedId?.message}
                </span>
              </div>
              <div className="">
                <Select
                  value={categoryRoomId}
                  onValueChange={(value) => {
                    setCategoryRoomId(value);
                    setValue("categoryRoomId", value, { shouldValidate: true });
                  }}
                >
                  <Label>Category Room</Label>
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar-four text-sidebar-primary ">
                    {categoryRooms.map((cate) => (
                      <SelectItem key={cate._id} value={String(cate._id)}>
                        {cate.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-red-500 text-sm">
                  {formState.errors.categoryRoomId?.message}
                </span>
              </div>
              <div className="">
                <Select
                  value={viewId}
                  onValueChange={(value) => {
                    setViewId(value);
                    setValue("viewId", value, { shouldValidate: true });
                  }}
                >
                  <Label>View</Label>
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar-four text-sidebar-primary ">
                    {views.map((view) => (
                      <SelectItem key={view._id} value={String(view._id)}>
                        {view.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-red-500 text-sm">
                  {formState.errors.viewId?.message}
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 md:py-4">
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
                id={_id}
                title="thumbnail"
                register={register}
                formState={formState}
                option={thumbnailOption}
                setOption={setThumbnailOption}
                url={thumbnailUrl}
                setUrl={setThumbnailUrl}
                isImages={false}
              />
              <FormUploadImage<FormValues>
                id={_id}
                title="map"
                register={register}
                formState={formState}
                option={mapOption}
                setOption={setMapOption}
                url={mapUrl}
                setUrl={setMapUrl}
                isImages={false}
              />
              <FormUploadImage
                id={_id}
                title="images"
                register={register}
                formState={formState}
                option={imagesOption}
                setOption={setImageOption}
                url={imagesUrl}
                setUrl={setImagesUrl}
                isImages={true}
              />
            </div>
          </div>
          <Button type="submit" variant={"outline"} className="text-left">
            {_id ? "Update" : "Add"} RoomType
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormRoomType;
