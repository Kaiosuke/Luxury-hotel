import { forceDeleteCart } from "@/app/api/cartRequest";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { IForm } from "@/interfaces";
import { useAppDispatch } from "@/redux/store";

function FormForceDeleteCart({ open, onClose, _id }: IForm) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      _id && (await dispatch(forceDeleteCart(_id)).unwrap());
      toast({
        variant: "success",
        title: "Success",
        description: "Delete Cart success",
      });
      return onClose(false);
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast({
        variant: "destructive",
        title: "Failed",
        description: errorMessage,
      });
      return onClose(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]  bg-sidebar-four text-sidebar-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl">
            Force Delete Cart
          </DialogTitle>
          <DialogDescription className="text-sidebar-primary">
            Are you sure you want to delete this Cart?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" variant={"destructive"} onClick={handleDelete}>
            Delete
          </Button>
          <Button
            type="submit"
            variant={"primary"}
            onClick={() => onClose(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FormForceDeleteCart;
