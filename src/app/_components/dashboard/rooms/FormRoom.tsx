import { getRoomType } from "@/app/api/roomTypesRequest";
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
import { IForm, IRoomType } from "@/interfaces";
import { useAppDispatch } from "@/redux/store";
import { RoomTypesSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { quickDesList, shortFeaturesList, featureList } from "@/app/data.json";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@radix-ui/react-dialog";

function FormRoom({ open, onClose, id }: IForm) {
  const [category, setCategory] = useState("Normal");
  const [view, setView] = useState("Mountain");
  const [quickDes, setQuickDes] = useState<string[]>([]);
  const [shortFeatures, setShortFeatures] = useState<string[]>([]);
  const [detailFeatures, setDetailFeatures] = useState<string[]>([]);

  const { register, formState, handleSubmit, reset } = useForm({
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
      // images: [""],
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
        reset({
          thumbnail: roomType.thumbnail,
          title: roomType.title,
          price: roomType.price,
          quantity: roomType.quantity,
          rate: roomType.rate,
          description: roomType.description,
          square: roomType.square,
          typeBed: roomType.typeBed,
          sleeps: roomType.sleeps,
          // images: roomType.images,
          map: roomType.map,
          shortDes: roomType.shortDes,
          detailDes: roomType.detailDes,
        });
        console.log(roomType.features);
        setQuickDes(roomType.quickDes);
        setShortFeatures(roomType.features);
        setDetailFeatures(roomType.detailFeatures);
        setCategory(roomType.category);
        setView(roomType.view);
      })();
    }
  }, [id]);

  const handleGetData = (data: IRoomType) => {};

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[1200px] sm:max-w-[600px] h-[90%] overflow-auto  bg-sidebar-four text-sidebar-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl">
            {id ? "Update" : "Add"} User
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit((data) => handleGetData(data))}>
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
                  {...register("price")}
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
                  {...register("quantity")}
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
                  {...register("sleeps")}
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
                            htmlFor={"shortFeature" + feature.id}
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
            <div className="grid md:grid-cols-2 gap-4 grid-cols-1 md:py-4"></div>
          </div>
          <Button type="submit" variant={"outline"} className="text-left">
            {id ? "Update" : "Add"} User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormRoom;
