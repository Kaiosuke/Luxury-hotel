import React, { useState } from "react";
import data from "@/app/data.json";
import Link from "next/link";

const HeaderMainPages = ({
  openMenu,
  setOpenMenu,
}: {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
}) => {
  const [image, setImage] = useState(
    "https://aguasdeibiza.com/wp-content/uploads/2019/01/salva-lopez-esvedra-aguasdeibiza-w-1200x857.jpg"
  );

  const { mainPages } = data;
  return (
    <>
      <nav className="col-span-1 md:col-span-2 lg:col-span-1">
        <ul className="flex flex-col gap-4">
          {mainPages.map((page) => (
            <li
              key={page.id}
              onMouseEnter={() => setImage(page.image)}
              onMouseLeave={() =>
                setImage(
                  "https://aguasdeibiza.com/wp-content/uploads/2019/01/salva-lopez-esvedra-aguasdeibiza-w-1200x857.jpg"
                )
              }
              onClick={() => setOpenMenu(!openMenu)}
              className="hover:text-gray-600 animation-normal w-fit"
            >
              <Link
                href={page.href}
                className="lg:text-3xl md:text-2xl text-xl"
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="col-span-2 lg:block hidden ">
        {image && (
          <img src={image} alt="logo" className="w-[60%] aspect-[8/10]" />
        )}
      </div>
    </>
  );
};

export default HeaderMainPages;
