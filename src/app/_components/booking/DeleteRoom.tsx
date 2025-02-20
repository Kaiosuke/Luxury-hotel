import { deleteCart, getAllCartByUserId } from "@/app/api/cartRequest";
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
import { authSelector } from "@/redux/selectors/authSelector";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface IDeleteForm {
  showDelete: boolean;
  setShowDelete: (value: boolean) => void;
}

function DeleteRoom({ showDelete, setShowDelete }: IDeleteForm) {
  const { cartId, setCartId } = useAppContext();

  const dispatch = useAppDispatch();
  const { currentUser } = useSelector(authSelector);

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
