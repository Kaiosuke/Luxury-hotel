import {
  addCategoryRoom,
  getCategoryRoom,
  updateCategoryRoom,
} from "@/app/api/categoryRoomRequest";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { IForm, ICategoryRoom } from "@/interfaces";
import { useAppDispatch } from "@/redux/store";
import { CategoryRoomSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function FormCategoryRoom({ open, onClose, _id }: IForm) {
  const { register, formState, handleSubmit, reset } = useForm({
    resolver: zodResolver(CategoryRoomSchema),
    defaultValues: {
      title: "",
    },
  });

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (_id) {
      (async () => {
        const categoryRoom = await dispatch(getCategoryRoom(_id)).unwrap();
        reset({
          title: categoryRoom.title,
        });
      })();
    }
  }, [_id]);

  const handleGetData = (data: ICategoryRoom) => {
    if (_id) {
      (async () => {
        try {
          await dispatch(
            updateCategoryRoom({ _id, categoryRoom: data })
          ).unwrap();
          toast({
            variant: "success",
            title: "Successfully!",
            description: "Update Category Room success",
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
          await dispatch(addCategoryRoom(data)).unwrap();
          toast({
            variant: "success",
            title: "Successfully!",
            description: "Add Category Room success",
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
            {_id ? "Update" : "Add"} CategoryRoom
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
            </div>
          </div>
          <Button type="submit" variant={"outline"} className="text-left">
            {_id ? "Update" : "Add"} CategoryRoom
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormCategoryRoom;
