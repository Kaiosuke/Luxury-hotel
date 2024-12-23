import React from "react";
import data from "@/app/data.json";
import Link from "next/link";

const HeaderSubPages = () => {
  const { subPages } = data;
  return (
    <nav className="col-1 md:col-2 lg:col-1 mt-10 md:mt-0 ">
      <ul className="flex flex-col gap-4">
        {subPages.map((page) => (
          <li key={page.id}>
            <Link
              href="#!"
              className="lg:text-xl md:text-lg text-base hover:text-gray-600 animation-normal w-fit"
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="md:mt-10 mt-16">
        <div className="flex items-start gap-6">
          <img
            className="w-[80px]"
            src="https://aguasdeibiza.com/wp-content/uploads/2019/01/small-luxury-hotels.svg"
            alt="iconic"
          />
          <img
            className="w-[120px]"
            src="https://aguasdeibiza.com/wp-content/uploads/2019/02/traveller-new.svg"
            alt="iconic 2"
          />
        </div>
        <div className="mt-4">
          <Link href="#!">
            <img
              src="https://aguasdeibiza.com/wp-content/uploads/2018/12/aguasdeibiza-logo.svg"
              alt="logo"
            />
          </Link>
        </div>
        <div className="mt-4">
          <p className="text-sm">
            Salvador Camacho,14. 07840 Santa Eulalia del Rio, Ibiza. Islas
            Baleares. España. Tl. 971 31 99 91
            <Link href="#!" className="underline px-1">
              info@aguasdeibiza.com
            </Link>
            © 2022 Ncalma Group
          </p>
        </div>
      </div>
    </nav>
  );
};

export default HeaderSubPages;
