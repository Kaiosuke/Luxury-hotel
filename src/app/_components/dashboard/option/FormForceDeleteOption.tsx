import { forceDeleteOption } from "@/app/api/optionRequest";
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

function FormForceDeleteOption({ open, onClose, _id }: IForm) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      _id && (await dispatch(forceDeleteOption(_id)).unwrap());
      toast({
        variant: "success",
        title: "Success",
        description: "Delete Option success",
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
            Force Delete Option
          </DialogTitle>
          <DialogDescription className="text-sidebar-primary">
            Are you sure you want to delete this Option?
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

export default FormForceDeleteOption;
