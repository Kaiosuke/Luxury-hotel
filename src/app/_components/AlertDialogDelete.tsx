import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { IForm } from "@/interfaces";
import { useAppDispatch } from "@/redux/store";
import { deleteReview } from "../api/reviewRequest";

function AlertDialogDelete({ open, onClose, _id }: IForm) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (_id) {
      console.log(_id);
      try {
        await dispatch(deleteReview(_id)).unwrap();
      } catch (error) {
        const errorMessage =
          typeof error === "string" ? error : "Something went wrong";
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: errorMessage,
        });
      }
      onClose(false);
    }
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant={"secondary"} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={handleDelete}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogDelete;
