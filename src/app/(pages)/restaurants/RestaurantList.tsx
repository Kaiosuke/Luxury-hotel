import data from "@/app/data.json";

import TitleXL from "@/app/_components/contentTitle/TitleXL";
import Link from "next/link";

const RestaurantList = () => {
  const { restaurants } = data;

  return (
    <section className="text-third padding-main">
      {restaurants.map((res) => (
        <div key={res.id}>
          <div
            className={`flex items-center lg:gap-32 gap-20 md:flex-row flex-col ${
              res.id % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-[1_0_auto] md:max-w-[50%] maw-w-[100%]">
              <img
                src={res.thumbnail}
                alt={res.shortTitle}
                className="w-full h-full object-cover aspect-[3/4]"
              />
            </div>
            <div className="flex-[1_0_auto] md:max-w-[40%] maw-w-[100%]">
              <span className="text-size-base">{res.shortDes}</span>
              <h2 className="text-size-6xl my-10">{res.shortTitle}</h2>
              <p>{res.description}</p>
              <div className="mt-10 flex gap-4">
                {res.booking.map((book, index) => (
                  <Link key={index} className="link-under" href={book.link}>
                    {book.titleBook}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="pd-high" />
          <TitleXL title={res.title} />
          <div className="pd-high" />
          <div className="pd-medium" />
        </div>
      ))}
    </section>
  );
};

export default RestaurantList;
