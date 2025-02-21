import { getAllFood } from "@/app/api/foodRequest";
import { addOption, getOption, updateOption } from "@/app/api/optionRequest";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { IForm, IOption } from "@/interfaces";
import { foodsSelector } from "@/redux/selectors/foodsSelector";
import { useAppDispatch } from "@/redux/store";
import { OptionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function FormOption({ open, onClose, _id }: IForm) {
  const { register, formState, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(OptionSchema),
    defaultValues: {
      title: "",
      foodId: "",
      price: 0,
      extension: "",
      typeDescription: "",
    },
  });

  const [foodId, setFoodId] = useState("");

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getAllFood(""));
  }, []);

  const { foods } = useSelector(foodsSelector);

  useEffect(() => {
    if (_id) {
      (async () => {
        const option = await dispatch(getOption(_id)).unwrap();
        reset({
          ...option,
          foodId: option.foodId._id,
        });
        setFoodId(option.foodId._id);
      })();
    }
  }, [_id]);

  const handleGetData = (data: any) => {
    if (_id) {
      (async () => {
        try {
          await dispatch(updateOption({ _id, option: data })).unwrap();
          toast({
            variant: "success",
            title: "Successfully!",
            description: "Update Option success",
          });
        } catch (error) {
          const errorMessage =
            typeof error === "string" ? error : "Something went wrong";
          toast({
            variant: "destructive",
            title: "Failed",
            description: errorMessage,
          });
        }
      })();
    } else {
      (async () => {
        try {
          await dispatch(addOption(data)).unwrap();
          toast({
            variant: "success",
            title: "Successfully!",
            description: "Add Option success",
          });
        } catch (error) {
          const errorMessage =
            typeof error === "string" ? error : "Something went wrong";
          toast({
            variant: "destructive",
            title: "Failed",
            description: errorMessage,
          });
        }
      })();
    }
    return onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[1000px] sm:max-w-[600px]   bg-sidebar-four text-sidebar-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl">
            {_id ? "Update" : "Add"} Option
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit((data) => handleGetData(data))}>
          <div className="grid  gap-2 py-2">
            <div className="grid md:grid-cols-4 gap-4 grid-cols-1">
              <div className="">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  className=""
                  placeholder=". . ."
                  {...register("title")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.title?.message}
                </span>
              </div>
              <div className="">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  className=""
                  placeholder=". . ."
                  {...register("price", { valueAsNumber: true })}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.price?.message}
                </span>
              </div>
              <div className="">
                <Label htmlFor="extension" className="text-right">
                  Extension
                </Label>
                <Input
                  id="extension"
                  type="text"
                  className=""
                  placeholder=". . ."
                  {...register("extension")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.extension?.message}
                </span>
              </div>
              <div className="">
                <Select
                  value={foodId}
                  onValueChange={(value) => {
                    setFoodId(value);
                    setValue("foodId", value, { shouldValidate: true });
                  }}
                >
                  <Label>Food</Label>
                  <SelectTrigger className="w-[100%] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar-four text-sidebar-primary ">
                    {foods.map((food) => (
                      <SelectItem key={food._id} value={String(food._id)}>
                        {food.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-red-500 text-sm">
                  {formState.errors.foodId?.message}
                </span>
              </div>
            </div>

            <div className="">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" {...register("typeDescription")} />
              <span className="text-red-500 text-sm">
                {formState.errors.typeDescription?.message}
              </span>
            </div>
          </div>
          <Button type="submit" variant={"outline"} className="text-left">
            {_id ? "Update" : "Add"} Option
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormOption;
