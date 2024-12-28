import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import MotionWrapper from "@/app/_components/MotionWrapper";
import data from "@/app/data.json";
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
import { roomFilterSelector } from "@/redux/selectors/roomsSelector";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByRate,
  filterBySortPrice,
  filterByViews,
} from "@/redux/slices/roomsSlice";
import { useState } from "react";

const BookingFilter = () => {
  const { viewList, featureList } = data;

  const dispatch = useDispatch();

  const { rate, sortPrice, views } = useSelector(roomFilterSelector);

  const handleFilterByRate = (value: string) => {
    dispatch(filterByRate(value));
  };

  const handleFilterBySort = (value: string) => {
    dispatch(filterBySortPrice(value));
  };
  const handleFilterByViews = (value: string) => {
    dispatch(filterByViews(value));
  };

  return (
    <MotionWrapper className="flex items-center sm:gap-4 gap-2">
      <Select onValueChange={handleFilterByRate}>
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

      <Select onValueChange={handleFilterBySort}>
        <SelectTrigger className="w-[200px] md:py-6 border-secondary">
          <SelectValue
            placeholder="Sort By Price"
            className="lg:text-xl"
          ></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary">
          <SelectItem value="recommended" className="lg:text-xl text-primary">
            Recommended
          </SelectItem>
          <SelectItem value="low" className="lg:text-xl text-primary">
            Lowest Price
          </SelectItem>
          <SelectItem value="high" className="lg:text-xl text-primary">
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
            <div className="mt-4">
              <h3 className="text-size-xl">View</h3>
              {viewList.map((view) => (
                <div key={view.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={view.id}
                    className="text-secondary"
                    checked={views.includes(view.title)}
                    onCheckedChange={() => handleFilterByViews(view.title)}
                  />
                  <label
                    htmlFor={view.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                  >
                    {view.title}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="text-size-xl">Features</h3>
              {featureList.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id="terms4" className="text-secondary" />
                  <label
                    htmlFor="terms4"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                  >
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button type="reset" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MotionWrapper>
  );
};

export default BookingFilter;
