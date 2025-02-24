import { userDeleteCart } from "@/app/api/cartRequest";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useAppContext from "@/hooks/useAppContext";
import { useAppDispatch } from "@/redux/store";

interface IDeleteForm {
  showDelete: boolean;
  setShowDelete: (value: boolean) => void;
}

function DeleteRoom({ showDelete, setShowDelete }: IDeleteForm) {
  const { cartId, setCartId } = useAppContext();

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setShowDelete(false);
    setCartId(null);
  };

  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      cartId && (await dispatch(userDeleteCart(cartId)).unwrap());
      setShowDelete(false);
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
    }
  };

  return (
    <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this booking?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is irreversible.
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

export default DeleteRoom;
