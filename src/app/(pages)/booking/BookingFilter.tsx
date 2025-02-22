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

import { getAllRoomTypeFilter } from "@/app/api/roomTypeRequest";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

const BookingFilter = () => {
  const { viewList, featureList, categoryList, typeBedList } = data;
  const [sort, setSort] = useState("");
  const [views, setViews] = useState<string[]>([]);
  const [categoryRooms, setCategoryRooms] = useState<string[]>([]);
  const [typeBeds, setTypeBeds] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getAllRoomTypeFilter({ sort, categoryRooms, views, typeBeds, features })
    );
  }, [sort]);

  const handleFilterBySort = (value: string) => {
    setSort(value);
  };

  const handleFilterByViews = (value: string) => {
    setViews((prev) => {
      if (prev.includes(value)) {
        return prev.filter((data) => data !== value);
      }
      return [...prev, value];
    });
  };

  const handleFilterByCategories = (value: string) => {
    setCategoryRooms((prev) => {
      if (prev.includes(value)) {
        return prev.filter((data) => data !== value);
      }
      return [...prev, value];
    });
  };

  const handleFilterByTypeBeds = (value: string) => {
    setTypeBeds((prev) => {
      if (prev.includes(value)) {
        return prev.filter((data) => data !== value);
      }
      return [...prev, value];
    });
  };

  const handleFilterByFeatures = (value: string) => {
    setFeatures((prev) => {
      if (prev.includes(value)) {
        return prev.filter((data) => data !== value);
      }
      return [...prev, value];
    });
  };

  const handleFiler = () => {
    dispatch(
      getAllRoomTypeFilter({
        sort,
        categoryRooms,
        views,
        typeBeds,
        features,
      })
    );
  };

  const handleReset = () => {
    setViews([]);
    setCategoryRooms([]);
    setTypeBeds([]);
    setFeatures([]);
  };

  return (
    <MotionWrapper className="flex items-center sm:gap-4 gap-2">
      <Select onValueChange={handleFilterBySort}>
        <SelectTrigger className="w-[220px] md:py-6 border-secondary">
          <SelectValue
            placeholder={`View By ${sort}`}
            className="lg:text-xl"
          ></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary">
          <SelectItem value="recommended" className="lg:text-xl text-primary">
            Recommended
          </SelectItem>
          <SelectItem value="rate" className="lg:text-xl text-primary">
            Lowest Rate
          </SelectItem>
          <SelectItem value="rate,desc" className="lg:text-xl text-primary">
            Highest Rate
          </SelectItem>
          <SelectItem value="price" className="lg:text-xl text-primary">
            Lowest Price
          </SelectItem>
          <SelectItem value="price,desc" className="lg:text-xl text-primary">
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
              <div>
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
              <div>
                <h3 className="text-size-xl mt-4">Category</h3>
                {categoryList.map((cate) => (
                  <div key={cate.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={cate.id}
                      className="text-secondary"
                      checked={categoryRooms.includes(cate.title)}
                      onCheckedChange={() =>
                        handleFilterByCategories(cate.title)
                      }
                    />
                    <label
                      htmlFor={cate.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                    >
                      {cate.title}
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-size-xl mt-4">Type Bed</h3>
                {typeBedList.map((typeBed) => (
                  <div key={typeBed.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={typeBed.id}
                      className="text-secondary"
                      checked={typeBeds.includes(typeBed.title)}
                      onCheckedChange={() =>
                        handleFilterByTypeBeds(typeBed.title)
                      }
                    />
                    <label
                      htmlFor={typeBed.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                    >
                      {typeBed.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-size-xl">Features</h3>
              {featureList.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature.id}
                    className="text-secondary"
                    checked={features.includes(feature.title)}
                    onCheckedChange={() =>
                      handleFilterByFeatures(feature.title)
                    }
                  />
                  <label
                    htmlFor={feature.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-lg cursor-pointer"
                  >
                    {feature.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button type="reset" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <DialogClose asChild></DialogClose>
            <DialogClose asChild>
              <Button type="reset" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="reset" variant="primary" onClick={handleFiler}>
                Filter
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MotionWrapper>
  );
};

export default BookingFilter;
