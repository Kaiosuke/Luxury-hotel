import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import MotionWrapper from "@/app/_components/MotionWrapper";

const BookingFilter = () => {
  const [price, setPrice] = useState(120);

  const handleSliderChange = (value: number[]) => {
    setPrice(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (value >= 0 && value <= 400) {
      setPrice(value);
    }
  };

  return (
    <MotionWrapper className="flex items-center sm:gap-6 gap-2">
      <Select>
        <SelectTrigger className="w-[180px] md:py-6 border-secondary">
          <SelectValue
            placeholder="View By"
            className="lg:text-xl"
          ></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary">
          <SelectItem value="room" className="lg:text-xl text-primary">
            Rooms
          </SelectItem>
          <SelectItem value="rate" className="lg:text-xl text-primary">
            rate
          </SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px] md:py-6 border-secondary">
          <SelectValue
            placeholder="Sort By"
            className="lg:text-xl"
          ></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary">
          <SelectItem value="recommended" className="lg:text-xl text-primary">
            Recommended
          </SelectItem>
          <SelectItem value="Lowest Price" className="lg:text-xl text-primary">
            Lowest Price
          </SelectItem>
          <SelectItem value="Highest Price" className="lg:text-xl text-primary">
            Highest Price
          </SelectItem>
        </SelectContent>
      </Select>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            Filters <FaAngleDown />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-secondary text-primary">
          <DialogHeader>
            <DialogTitle className="md:text-2xl">Filters</DialogTitle>
          </DialogHeader>
          <div className="grid sm:grid-cols-2 grid-cols-1 items-start w-full">
            <RadioGroup defaultValue="comfortable">
              <h3 className="text-size-xl">Display</h3>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="rView1" />
                <Label htmlFor="rView1" className="md:text-lg cursor-pointer">
                  View By Rooms
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="rView2" />
                <Label htmlFor="rView2" className="md:text-lg">
                  View By Rates
                </Label>
              </div>
            </RadioGroup>
            <RadioGroup defaultValue="Recommended">
              <h3 className="text-size-xl">Sort by</h3>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Recommended" id="rSort1" />
                <Label htmlFor="rSort1" className="md:text-lg cursor-pointer">
                  Recommended
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Lowest Price" id="rSort2" />
                <Label htmlFor="rSort2" className="md:text-lg">
                  Lowest Price
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value=" Highest Price" id="rSort3" />
                <Label htmlFor="rSort3" className="md:text-lg">
                  Highest Price
                </Label>
              </div>
            </RadioGroup>
            <div className="mt-4">
              <h3 className="text-size-xl">View</h3>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" className="text-secondary" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                >
                  Mountain View
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms2" className="text-secondary" />
                <label
                  htmlFor="terms2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                >
                  Pool view
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms3" className="text-secondary" />
                <label
                  htmlFor="terms3"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                >
                  Sea view
                </label>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-size-xl">Features</h3>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms4" className="text-secondary" />
                <label
                  htmlFor="terms4"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                >
                  Air conditioning
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms5" className="text-secondary" />
                <label
                  htmlFor="terms5"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                >
                  TV
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms6" className="text-secondary" />
                <label
                  htmlFor="terms6"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                >
                  Balcony/Lanai/Terrace
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms7" className="text-secondary" />
                <label
                  htmlFor="terms7"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                >
                  Bathrobe
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms8" className="text-secondary" />
                <label
                  htmlFor="terms8"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                >
                  Bathroom amenities
                </label>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-size-xl">Room Category</h3>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms9" className="text-secondary" />
                <label
                  htmlFor="terms9"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                >
                  Normal
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms10" className="text-secondary" />
                <label
                  htmlFor="terms10"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                >
                  Primary
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms11" className="text-secondary" />
                <label
                  htmlFor="terms11"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                >
                  Vip
                </label>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-size-xl">Price (avg/night)</h3>
              <div className="flex items-center space-x-2">
                <Slider
                  defaultValue={[price]}
                  max={400}
                  step={10}
                  onValueChange={handleSliderChange}
                  className="bg-red-200"
                />
              </div>
              <div className=" mt-4 w-full">
                <div className="flex items-center w-full gap-2">
                  <Input
                    type="number"
                    className="w-full"
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}
                    placeholder="Price"
                  />
                  To
                  <Input type="number" placeholder="460" readOnly />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button type="reset" variant="secondary">
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MotionWrapper>
  );
};

export default BookingFilter;
