import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateUser } from "@/app/api/usersRequest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ECart, ICart, IUser } from "@/interfaces";
import { authSelector } from "@/redux/selectors/authSelector";
import { updateCurrentUser } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import { CheckOutSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { cartUserRemainingSelector } from "@/redux/selectors/cartsSelector";
import { updateCart } from "@/app/api/cartsRequest";
import LoadingPage from "@/app/_components/LoadingPage";
import { addCartSuccess } from "@/redux/slices/cartsSlice";

const CheckoutInfo = () => {
  const [country, setCountry] = useState("VN");
  const { currentUser } = useSelector(authSelector);
  const { register, formState, handleSubmit, reset } = useForm({
    resolver: zodResolver(CheckOutSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      country: "",
      address: "",
      city: "",
    },
  });
  const { carts } = useSelector(cartUserRemainingSelector);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!carts.length) {
      router.push("/");
    }
  }, []);

  if (!carts.length) {
    return <LoadingPage />;
  }

  useEffect(() => {
    if (currentUser) {
      reset({
        username: currentUser.username,
        phoneNumber: currentUser.phoneNumber,
        country: currentUser.country,
        address: currentUser.address,
        city: currentUser.city,
      });
    }
  }, []);

  const handleGetData = async (data: IUser) => {
    if (!currentUser || !currentUser.id) return;
    const newData = {
      ...currentUser,
      ...data,
      country,
    };

    dispatch(updateUser({ id: currentUser.id, user: newData }));
    dispatch(updateCurrentUser(newData));

    dispatch(addCartSuccess(carts));
    carts.map((cart) => {
      const updatedCart: ICart = {
        ...cart,
        status: ECart.booked,
      };
      dispatch(updateCart({ id: cart.id, cart: updatedCart }));
    });
    router.push("/booking/success");
  };

  return (
    <div className="border border-secondary rounded-lg p-4 text-third">
      <form onSubmit={handleSubmit((data) => handleGetData(data))}>
        <div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <span className="text-red-500 ml-10"></span>
              <Input
                id="email"
                type="email"
                disabled
                placeholder={currentUser?.email}
              />
              <span className="text-red-500"></span>
            </div>
            <div>
              <Label htmlFor="username">UserName</Label>
              <span className="text-red-500 ml-10"></span>
              <Input
                id="username"
                type="text"
                placeholder=". . ."
                {...register("username")}
              />
              <span className="text-red-500">
                {formState.errors.username?.message}
              </span>
            </div>
            <div className="w-full">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <span className="text-red-500 ml-10"></span>
              <Input
                id="phoneNumber"
                type="text"
                placeholder=". . ."
                {...register("phoneNumber")}
              />
              <span className="text-red-500">
                {formState.errors.phoneNumber?.message}
              </span>
            </div>
          </div>
          <div className="w-full mt-10">
            <Select
              value={country}
              onValueChange={(value) => setCountry(value)}
              {...register("country")}
            >
              <SelectTrigger className="w-[50%]">
                <SelectValue placeholder="Country" className="text-sm" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="VN" className="focus:bg-secondary">
                    VietNam
                  </SelectItem>
                  <SelectItem value="USA" className="focus:bg-secondary">
                    American
                  </SelectItem>
                  <SelectItem value="UK" className="focus:bg-secondary">
                    England
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-2">
            <div>
              <Label htmlFor="address">Address</Label>
              <span className="text-red-500 ml-10"></span>
              <Input
                id="address"
                type="text"
                placeholder=". . ."
                {...register("address")}
              />
              <span className="text-red-500">
                {formState.errors.address?.message}
              </span>
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <span className="text-red-500 ml-10"></span>
              <Input
                id="city"
                type="text"
                placeholder=". . ."
                {...register("city")}
              />
              <span className="text-red-500">
                {formState.errors.city?.message}
              </span>
            </div>
          </div>
          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-size-xl">
                  Reservation Details
                </AccordionTrigger>
                <AccordionContent>
                  <Input id="reservation" type="text" placeholder=". . ." />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="mt-10">
          <span className="text-size-xl font-semibold">Policies:</span>
          <div className="bg-secondary text-primary mt-2">
            <div className="p-4">
              <div className="flex gap-6">
                <div>
                  <div className="font-semibold">Check-in</div>
                  <div>After 3:00 pm</div>
                </div>
                <div>
                  <div className="font-semibold">Check-out</div>
                  <div>Before 12:00 pm</div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">ROOM 1 DELUXE</h3>
                <div>
                  <div>Guarantee Policy</div>
                  <p>
                    Full prepayment is required at time of booking and it is not
                    refundable in case of cancellation or modification.
                  </p>
                </div>
                <div className="mt-2">
                  <div>Cancel Policy</div>
                  <p>
                    100% of the total stay will be charged as penalty fee in
                    case of cancellation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-right">
          <Button variant={"third"}>Continue</Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutInfo;
