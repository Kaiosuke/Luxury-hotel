import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IForm } from "@/interfaces";

function FormDelete({ open, onClose, id, type }: IForm) {
  console.log(id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]  bg-sidebar-four text-sidebar-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl">
            Delete {type}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {type}?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" variant={"destructive"}>
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

export default FormDelete;
