"use client";
import TitleNormal from "@/app/_components/contentTitle/TitleNormal";
import HeroImage from "@/app/_components/HeroImage";
import SplideList from "@/app/_components/SplideList";
import ThumbnailImage from "@/app/_components/ThumbnailImage";

import LoadingPage from "@/app/_components/LoadingPage";
import { getRoomType } from "@/app/api/roomTypeRequest";
import { roomTypesSelector } from "@/redux/selectors/roomTypesSelector";
import { useAppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import RoomDetail from "./RoomDetail";
import Review from "./Review";

const page = () => {
  const { id }: { id: string } = useParams();

  const { roomType, roomTypes, loading, error } =
    useSelector(roomTypesSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getRoomType(id));
    }
  }, [dispatch]);

  // if (loading) {
  //   return <LoadingPage />;
  // }

  // if (error) {
  //   return error;
  // }

  return (
    <>
      {roomType && (
        <>
          {/* <HeroImage
            image={roomType.thumbnail}
            title={`${roomType.title} - Soulful Mediterranean style`}
            linkContext="Book this room now"
            link="#roomDetail"
          />
          <div className="pd-high" />
          <RoomDetail room={roomType} />
          <div className="pd-medium" />
          <ThumbnailImage image={roomType.map} title={roomType.title} />
          <div className="pd-high" />
          <TitleNormal title="We have many other luxury rooms for you." />
          <div className="pd-medium" />
          {roomTypes && (
            <section className="padding-main">
              <SplideList
                dataList={roomTypes}
                id={roomType.id}
                splideClass="roomList"
              />
            </section>
          )} */}
          <div className="pd-high" />
          <TitleNormal title="Reviews" />
          <div className="pd-high" />
          <Review />
          <div className="pd-high" />
        </>
      )}
    </>
  );
};
export default page;
