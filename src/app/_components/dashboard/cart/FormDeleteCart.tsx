import { deleteCart, getCart } from "@/app/api/cartsRequest";
import { deleteRoom, getRoom, updateRoom } from "@/app/api/roomsRequest";
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

function FormDeleteCart({ open, onClose, _id }: IForm) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (_id) {
      const cart = await dispatch(getCart(_id)).unwrap();
      const room = await dispatch(getRoom(cart.roomId)).unwrap();
      const newBookDates = room.bookedDates.filter(
        (date) =>
          date.from !== cart.bookedDates.from || date.to !== cart.bookedDates.to
      );

      const newRoom = {
        ...room,
        bookedDates: newBookDates,
      };

      onClose(false);

      await dispatch(updateRoom({ _id: cart.roomId, room: newRoom }));

      await dispatch(deleteCart(_id));
      toast({
        variant: "success",
        title: "Success",
        description: "Delete Room success",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]  bg-sidebar-four text-sidebar-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl">Delete Cart</DialogTitle>
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

export default FormDeleteCart;
