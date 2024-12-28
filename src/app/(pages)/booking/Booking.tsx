import BookingCalendar from "@/app/_components/BookingCalendar";
import Extension from "@/app/_components/Extension";
import MotionWrapper from "@/app/_components/MotionWrapper";
import BookingFilter from "./BookingFilter";
import BookingList from "./BookingList";

const Booking = () => {
  return (
    <section className="text-third padding-main min-h-screen">
      <div className="flex gap-6">
        <div className="flex-[1_0_auto] lg:max-w-[70%] max-w-[100%] gap-10">
          <MotionWrapper>
            <BookingCalendar isShow />
            <h1 className="text-size-5xl mt-20 mb-10">Select Next Room</h1>
          </MotionWrapper>
          <BookingFilter />
          <BookingList />
        </div>
        <div className="flex-[1_0_auto] max-w-[30%] lg:block hidden">
          <div className="sticky top-32">
            <Extension />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
