import { deleteUser } from "@/app/api/usersRequest";
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

function FormDeleteUser({ open, onClose, id }: IForm) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleDelete = () => {
    id && dispatch(deleteUser(id));
    toast({
      variant: "success",
      title: "Success",
      description: "Delete user success",
    });
    return onClose(false);
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]  bg-sidebar-four text-sidebar-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl">Delete User</DialogTitle>
          <DialogDescription className="text-sidebar-primary">
            Are you sure you want to delete this User?
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

export default FormDeleteUser;
