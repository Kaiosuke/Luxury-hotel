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

import { getAllCart, updateCart, userDeleteCart } from "@/app/api/cartRequest";
import { userUpdateUser } from "@/app/api/userRequest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAvailableCartsUsers } from "@/hooks/useAvailableCarts";
import { ICart, IUser } from "@/interfaces";
import { authSelector } from "@/redux/selectors/authSelector";
import {
  cartsSelector,
  cartUserRemainingSelector,
} from "@/redux/selectors/cartsSelector";
import { updateCurrentUser } from "@/redux/slices/authSlice";
import { addCartSuccess } from "@/redux/slices/cartsSlice";
import { useAppDispatch } from "@/redux/store";
import { CheckOutSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import LoadingPage from "@/app/_components/LoadingPage";
import payment from "@/app/api/paymentRequest";
const CheckoutInfo = () => {
  const [country, setCountry] = useState("VN");
  const { currentUser, loading } = useSelector(authSelector);

  const { toast } = useToast();

  const dispatch = useAppDispatch();

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
  const { cartsUsers } = useSelector(cartUserRemainingSelector);
  const { carts } = useSelector(cartsSelector);

  const router = useRouter();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await dispatch(getAllCart("")).unwrap();
  //     } catch (error) {
  //       const errorMessage =
  //         typeof error === "string" ? error : "Something went wrong";
  //       toast({
  //         variant: "destructive",
  //         title: "Registration failed",
  //         description: errorMessage,
  //       });
  //     }
  //   })();
  // }, []);

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

  useEffect(() => {
    currentUser && dispatch(getAllCart(""));
  }, []);

  const handleGetData = async (data: IUser) => {
    try {
      const newData = {
        ...currentUser,
        ...data,
        country,
      };
      dispatch(addCartSuccess(carts));

      if (currentUser && currentUser._id) {
        const areArraysEqual =
          JSON.stringify(newData) === JSON.stringify(currentUser);

        if (!areArraysEqual) {
          await dispatch(
            userUpdateUser({ _id: currentUser._id, user: newData })
          ).unwrap();

          dispatch(updateCurrentUser(newData));
        }

        for (const cart of cartsUsers) {
          const availableCart = useAvailableCartsUsers({
            carts: carts,
            newBooking: cart,
          });

          const existCart = availableCart.find((data) => data._id !== cart._id);
          if (existCart?._id) {
            await dispatch(userDeleteCart(existCart._id)).unwrap();
          }
        }
      }

      const cartIds = cartsUsers
        .map((cart) => cart._id)
        .filter((id): id is string => id !== undefined);

      const totalMoney = cartsUsers.reduce((acc, cur) => {
        return acc + cur.totalPrice * 23500;
      }, 0);

      const res: any = await dispatch(
        payment({ cartIds, totalMoney })
      ).unwrap();

      router.push(res);

      toast({
        variant: "success",
        title: "success",
        description: "Booking Success",
      });

      dispatch(addCartSuccess(cartsUsers));
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

  if (!carts.length || loading) {
    return <LoadingPage />;
  }

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
                <h3 className="font-semibold">ROOM</h3>
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
          <Button variant={"third"}>Booking</Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutInfo;
