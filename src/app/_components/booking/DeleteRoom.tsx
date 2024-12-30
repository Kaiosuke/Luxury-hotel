import { deleteCart } from "@/app/api/cartsRequest";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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

  const handleDelete = () => {
    cartId && dispatch(deleteCart(cartId));
    setShowDelete(false);
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
