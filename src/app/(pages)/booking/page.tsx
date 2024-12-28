"use client";
import { useEffect } from "react";
import HeroImage from "@/app/_components/HeroImage";
import Booking from "./Booking";
import { getAllOption } from "@/app/api/optionsRequest";
import { getAllRoom } from "@/app/api/roomsRequest";
import { getAllRoomType } from "@/app/api/roomTypesRequest";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { roomSelector } from "@/redux/selectors/roomsSelector";
import LoadingPage from "@/app/_components/LoadingPage";

const page = () => {
  const { loading, error } = useSelector(roomSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllRoom());
    dispatch(getAllRoomType());
    dispatch(getAllOption());
  }, []);
  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return error;
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
