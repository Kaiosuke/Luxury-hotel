import TitleNormal from "@/app/_components/contentTitle/TitleNormal";
import TitleXL from "@/app/_components/contentTitle/TitleXL";
import MotionWrapper from "@/app/_components/MotionWrapper";
import SplideImage from "@/app/_components/SplideImage";
import { IRoom } from "@/interfaces";
import { ParallaxBanner } from "react-scroll-parallax";

const RoomDetail = ({ room }: { room: IRoom }) => {
  return (
    <section className="padding-main text-third">
      <div className="grid sm:grid-cols-2 gap-6 grid-cols-1">
        <div className="flex">
          <MotionWrapper>
            <div className="text-size-4xl">{room.title}</div>
            <p className="mt-4 text-size-lg">{room.description}</p>
          </MotionWrapper>
          <div className="sm:block hidden line-2" />
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="flex">
            <ul className="flex flex-col gap-6">
              {room.quickDes?.map((des, index) => (
                <li key={index} className="text-size-xl">
                  <MotionWrapper>{des}</MotionWrapper>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-6">
              {room.features?.map((feature, index) => (
                <li key={index} className="text-size-xl">
                  <MotionWrapper>{feature}</MotionWrapper>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="pd-medium" />
      <MotionWrapper>
        <ParallaxBanner
          layers={[
            {
              image: `${room.thumbnail}`,
              speed: -20,
            },
          ]}
          className="aspect-[16/9]"
        />
      </MotionWrapper>
      <div className="pd-medium" />
      <TitleXL title="For the most inventive souls" />
      <div className="pd-medium" />
      <SplideImage images={room.images} splideClass="roomDetail" />
      <div className="pd-medium" />
      <TitleNormal title={room.description} />
    </section>
  );
};

export default RoomDetail;
