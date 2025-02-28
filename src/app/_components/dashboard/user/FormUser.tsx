import { adminAddUser, getUser, updateUser } from "@/app/api/userRequest";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { useToast } from "@/hooks/use-toast";
import { ERole, IForm, IUser } from "@/interfaces";
import { useAppDispatch } from "@/redux/store";
import { UserUpdateSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function FormUser({ open, onClose, _id }: IForm) {
  const [role, setRole] = useState("user");

  const { register, formState, handleSubmit, reset } = useForm({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      country: "",
      address: "",
      city: "",
    },
  });

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (_id) {
      (async () => {
        const user = await dispatch(getUser(_id)).unwrap();
        reset({
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          country: user.country,
          address: user.address,
          city: user.city,
        });

        user.role && setRole(user.role);
      })();
    }
  }, [_id]);

  const handleGetData = (data: IUser) => {
    const newRole =
      role === "ceo" ? ERole.ceo : role === "admin" ? ERole.admin : ERole.user;
    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      country: data.country,
      address: data.address,
      city: data.city,
      role: newRole,
    };
    if (_id) {
      (async () => {
        try {
          await dispatch(updateUser({ _id, user: newUser })).unwrap();
          toast({
            variant: "success",
            title: "Success",
            description: "Update User success",
          });
        } catch (error) {
          const errorMessage =
            typeof error === "string" ? error : "Something went wrong";
          toast({
            variant: "destructive",
            title: "Failed",
            description: errorMessage,
          });
        }
      })();
    } else {
      (async () => {
        try {
          await dispatch(adminAddUser(newUser)).unwrap();
          toast({
            variant: "success",
            title: "Success",
            description: "Add User success",
          });
        } catch (error) {
          const errorMessage =
            typeof error === "string" ? error : "Something went wrong";
          toast({
            variant: "destructive",
            title: "Failed",
            description: errorMessage,
          });
        }
      })();
    }
    return onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[1000px] sm:max-w-[600px]   bg-sidebar-four text-sidebar-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl">
            {_id ? "Update" : "Add"} User
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit((data) => handleGetData(data))}>
          <div className="grid  gap-2 py-2">
            <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
              <div className="">
                <Label htmlFor="username" className="text-right">
                  User Name
                </Label>
                <Input
                  id="username"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("username")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.username?.message}
                </span>
              </div>

              <div className="">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("email")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.email?.message}
                </span>
              </div>
            </div>

            {_id && role !== "ceo" && (
              <div className="">
                <Select value={role} onValueChange={(value) => setRole(value)}>
                  <Label>Role</Label>
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar-four text-sidebar-primary ">
                    <SelectItem value="admin">admin</SelectItem>
                    <SelectItem value="user">user</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 grid-cols-1 md:py-4">
              <div className="">
                <Label htmlFor="phoneNumber" className="text-right">
                  PhoneNumber
                </Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("phoneNumber")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.phoneNumber?.message}
                </span>
              </div>
              <div className="">
                <Label htmlFor="country" className="text-right">
                  Country
                </Label>
                <Input
                  id="country"
                  type="text"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("country")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.country?.message}
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 grid-cols-1 md:py-4">
              <div className="">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("address")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.address?.message}
                </span>
              </div>
              <div className="">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <Input
                  id="city"
                  type="text"
                  className="mt-1"
                  placeholder=". . ."
                  {...register("city")}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.city?.message}
                </span>
              </div>
            </div>
          </div>
          <Button type="submit" variant={"outline"} className="text-left">
            {_id ? "Update" : "Add"} User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormUser;
