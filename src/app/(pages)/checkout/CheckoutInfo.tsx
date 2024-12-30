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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CheckOutSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const CheckoutInfo = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(CheckOutSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      country: "",
      address: "",
      city: "",
      reservation: "",
    },
  });

  return (
    <div className="border border-secondary rounded-lg p-4 text-third">
      <form>
        <div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <span className="text-red-500 ml-10"></span>
              <Input
                id="email"
                type="email"
                name="email"
                disabled
                placeholder="Trongle"
              />
              <span className="text-red-500"></span>
            </div>
            <div>
              <Label htmlFor="email">UserName</Label>
              <span className="text-red-500 ml-10"></span>
              <Input id="email" type="email" name="email" placeholder=". . ." />
              <span className="text-red-500"></span>
            </div>
            <div className="w-full">
              <Label htmlFor="email">Phone Number</Label>
              <span className="text-red-500 ml-10"></span>
              <Input id="email" type="email" name="email" placeholder=". . ." />
              <span className="text-red-500"></span>
            </div>
          </div>
          <div className="w-full mt-10">
            <Select>
              <SelectTrigger className="w-[50%]">
                <SelectValue placeholder="Country" className="text-sm" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple" className="focus:bg-secondary">
                    VietNam
                  </SelectItem>
                  <SelectItem value="banana" className="focus:bg-secondary">
                    American
                  </SelectItem>
                  <SelectItem value="blueberry" className="focus:bg-secondary">
                    England
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <Label htmlFor="email">Address</Label>
              <span className="text-red-500 ml-10"></span>
              <Input id="email" type="email" name="email" placeholder=". . ." />
              <span className="text-red-500"></span>
            </div>
            <div>
              <Label htmlFor="email">City</Label>
              <span className="text-red-500 ml-10"></span>
              <Input id="email" type="email" name="email" placeholder=". . ." />
              <span className="text-red-500"></span>
            </div>
          </div>
          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-size-xl">
                  Reservation Details
                </AccordionTrigger>
                <AccordionContent>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder=". . ."
                  />
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
