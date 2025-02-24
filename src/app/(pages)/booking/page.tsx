"use client";
import HeroImage from "@/app/_components/HeroImage";
import LoadingPage from "@/app/_components/LoadingPage";
import { getAllOption } from "@/app/api/optionRequest";
import { getAllRoom } from "@/app/api/roomRequest";
import { getAllRoomType } from "@/app/api/roomTypeRequest";
import { roomsSelector } from "@/redux/selectors/roomsSelector";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Booking from "./Booking";

const page = () => {
  const { loading } = useSelector(roomsSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllRoom(""));
    dispatch(getAllOption(""));
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <HeroImage
        image="//aguasdeibiza.com/wp-content/uploads/2019/01/aguasdeibiza-404.jpg"
        title=" Slip your body and mind into the spirit of Ibiza."
        link="#booking"
        linkContext="A Five Star Grand Luxe Hotel to get inspired"
        isBook={true}
      />
      <div className="pd-medium" />
      <Booking />
      <div className="pd-medium" />
    </>
  );
};

export default page;
