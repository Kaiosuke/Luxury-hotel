import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IForm } from "@/interfaces";

function FormUser({ open, onClose, id }: IForm) {
  if (id) {
    console.log(id);
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-sidebar-four text-sidebar-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl">
            {id ? "Update" : "Add"} User
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="userName" className="text-right">
              User Name
            </Label>
            <Input id="userName" className="mt-1" placeholder=". . ." />
            <span className="text-red-500 text-sm"></span>
          </div>

          <div className="">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" className="mt-1" placeholder=". . ." />
            <span className="text-red-500 text-sm"></span>
          </div>

          <div className="">
            <Select defaultValue="User">
              <Label>Role</Label>
              <SelectTrigger className="w-[180px] text-sm">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent
                className="bg-sidebar-four text-sidebar-primary "
                defaultValue="User"
              >
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="mt-1"
              placeholder=". . ."
            />
            <span className="text-red-500 text-sm"></span>
          </div>
          <div className="">
            <Label htmlFor="confirm" className="text-right">
              confirm
            </Label>
            <Input
              id="confirm"
              type="password"
              className="mt-1"
              placeholder=". . ."
            />
            <span className="text-red-500 text-sm"></span>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant={"outline"} className="text-left">
            {id ? "Update" : "Add"} User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FormUser;
