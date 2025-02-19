import { addRoom, getRoom, updateRoom } from "@/app/api/roomsRequest";
import { getRoomType } from "@/app/api/roomTypesRequest";
import { addUser, getUser, updateUser } from "@/app/api/usersRequest";
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
import { roomTypesSelector } from "@/redux/selectors/roomTypesSelector";
import { useAppDispatch } from "@/redux/store";
import { RoomSchema, UserSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function FormRoom({ open, onClose, _id }: IForm) {
  const [status, setStatus] = useState("available");
  const [roomType, setRoomType] = useState("1");
  const [floor, setFloor] = useState(1);

  const { register, formState, handleSubmit, reset } = useForm({
    resolver: zodResolver(RoomSchema),
    defaultValues: {
      roomNumber: "",
    },
  });

  const { roomTypes } = useSelector(roomTypesSelector);

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (_id) {
      (async () => {
        const room = await dispatch(getRoom(_id)).unwrap();
        const roomType = await dispatch(getRoomType(room.roomTypeId)).unwrap();
        reset({
          roomNumber: room.roomNumber,
        });
        setStatus(room.status);
        setFloor(room.floor);
        setRoomType(roomType.id);
      })();
    }
  }, [_id]);

  const handleGetData = (data: any) => {
    const newRoom = {
      ...data,
      roomTypeId: roomType,
      floor,
      status,
      bookedDates: [],
    };
    if (_id) {
      dispatch(updateRoom({ _id, room: newRoom }));
      toast({
        variant: "success",
        title: "success",
        description: "Update Room success",
      });
    } else {
      dispatch(addRoom(newRoom));
      toast({
        variant: "success",
        title: "success",
        description: "Add Room success",
      });
    }
    return onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[1000px] sm:max-w-[600px]   bg-sidebar-four text-sidebar-primary">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-xl">
            {_id ? "Update" : "Add"} Room
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit((data) => handleGetData(data))}>
          <div className="grid  gap-2 py-2">
            <div className="grid md:grid-cols-4 gap-4 grid-cols-1">
              <div className="">
                <Label htmlFor="roomNumber" className="text-right">
                  Room Number
                </Label>
                <Input
                  id="roomNumber"
                  type="text"
                  className=""
                  placeholder=". . ."
                  {...register("roomNumber", { valueAsNumber: true })}
                />
                <span className="text-red-500 text-sm">
                  {formState.errors.roomNumber?.message}
                </span>
              </div>

              <div className="">
                <Select
                  value={roomType}
                  onValueChange={(value) => setRoomType(value)}
                >
                  <Label>Room Type</Label>
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar-four text-sidebar-primary ">
                    {roomTypes.length &&
                      roomTypes.map((roomType) => (
                        <SelectItem key={roomType.id} value={roomType.id}>
                          {roomType.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="">
                <Select
                  value={String(floor)}
                  onValueChange={(value) => setFloor(Number(value))}
                >
                  <Label>Floor</Label>
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar-four text-sidebar-primary ">
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="">
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value)}
                >
                  <Label>Status Room</Label>
                  <SelectTrigger className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar-four text-sidebar-primary ">
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button type="submit" variant={"outline"} className="text-left">
            {_id ? "Update" : "Add"} Room
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormRoom;
