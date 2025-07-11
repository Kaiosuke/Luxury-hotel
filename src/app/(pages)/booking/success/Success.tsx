import { Button } from "@/components/ui/button";
import { authSelector } from "@/redux/selectors/authSelector";
import { cartsSelector } from "@/redux/selectors/cartsSelector";
import Link from "next/link";
import { FaCcVisa } from "react-icons/fa";
import { useSelector } from "react-redux";
import CartSuccessList from "./CartSuccessList";
import { useToast } from "@/hooks/use-toast";
import sendInfo from "@/app/api/sendMailRequest";
import { useAppDispatch } from "@/redux/store";
import { addCartSuccess } from "@/redux/slices/cartsSlice";

const Success = () => {
  const { currentUser } = useSelector(authSelector);
  const { cartsSuccess } = useSelector(cartsSelector);

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleSendInfo = async () => {
    if (currentUser && currentUser.email) {
      try {
        await dispatch(
          sendInfo({
            user: currentUser?.username,
            email: currentUser?.email,
          })
        ).unwrap();
        toast({
          variant: "success",
          title: "Successfully!",
          description: "Please check your email",
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
    }
  };

  return (
    <div className="border border-secondary rounded-lg p-4 text-third">
      <h3 className="text-size-xl">Reservation Details</h3>
      <div className="grid grid-cols-2">
        <div>
          <div className="font-semibold">Aguas de Ibiza Grand Luxe Hotel</div>
          <div>Salvador Camacho 14, Santa Eulalia del Rio Ibiza, 07840</div>
          <div>+34971319991</div>
          <div>info@aguasdeibiza.com</div>
        </div>
        <div>
          <span className="font-semibold">Guest details</span>

          <div>User Name: {currentUser?.username}</div>
          <div>Email: {currentUser?.email}</div>
          <div>Address: {currentUser?.address}</div>
          <div>
            City: {currentUser?.city} - {currentUser?.country}
          </div>
        </div>
        <div className="mt-4">
          <span className="font-semibold">Payment details</span>
          <div className="flex gap-2 items-center">
            <FaCcVisa className="text-size-xl" /> <span>Card ending 1234</span>
          </div>
          <div>{currentUser?.email}</div>
        </div>
      </div>
      <div className="h-[400px] overflow-auto">
        {cartsSuccess &&
          cartsSuccess.map((cart) => (
            <CartSuccessList key={cart._id} cart={cart} />
          ))}
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
                  100% of the total stay will be charged as penalty fee in case
                  of cancellation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4  flex gap-2">
        <Button variant={"secondary"} onClick={handleSendInfo}>
          Send Mail
        </Button>
        <Link href="/">
          <Button variant={"third"}>Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
