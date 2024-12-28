"use client";
import useAppContext from "@/hooks/useAppContext";
import { HiMiniXMark } from "react-icons/hi2";
import BookingCalendar from "./BookingCalendar";

const BookNow = () => {
  const { showBowNow, setShowBookNow } = useAppContext();

  return (
    <div
      className={`fixed inset-0 h-screen w-screen z-[41] bg-secondary flex items-center justify-center animation-normal ${
        showBowNow
          ? "translate-y-[0] opacity-100"
          : "translate-y-[-1000px] opacity-0"
      }`}
    >
      <div className="absolute right-8 top-8">
        <HiMiniXMark
          className="text-size-6xl text-primary cursor-pointer"
          onClick={() => setShowBookNow(!showBowNow)}
        />
      </div>
      <div className="text-center padding-main 2xl:px-[400px] m-auto text-primary">
        <div className="text-size-6xl mb-20 font-medium">Book your Stay</div>
        <BookingCalendar isShow color="text-primary" />
        <div className="padding-main mt-20">
          <p className="text-size-xl">
            A peaceful, central setting ideal for exploring the island. The
            hotel is the ideal place to enjoy the best of the island. Its
            location, on Santa Eulalia’s peaceful promenade and the natural
            surroundings make Aguas de Ibiza a charming hotel from which to
            explore the beautiful beaches the island has to offer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
