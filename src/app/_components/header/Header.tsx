"use client";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import data from "../../data.json";
import useDetectScroll from "@smakss/react-scroll-direction";

const Header = () => {
  const { pages, features } = data;
  const [openMenu, setOpenMenu] = useState(false);
  const [image, setImage] = useState(
    "https://aguasdeibiza.com/wp-content/uploads/2019/01/salva-lopez-esvedra-aguasdeibiza-w-1200x857.jpg"
  );

  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollDir } = useDetectScroll();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`text-primary fixed w-full z-[9999] animation-slow
        ${isScrolled ? "bg-primary" : "bg-transparent"} 
        ${
          isScrolled && scrollDir === "down"
            ? "translate-y-[-1000px]"
            : "translate-y-[0]"
        }
        `}
    >
      <div
        className={`flex justify-between items-center md:px-10 py-4 sm:px-6 px-3 relative z-[2] `}
      >
        <div
          className={`text-sm lg:block hidden animation-normal ${
            isScrolled && "text-black"
          } ${openMenu ? "opacity-0 " : "opacity-100"}`}
        >
          <span>
            Grand Luxe <br />
            Hotel
          </span>
        </div>
        <div
          className={`animation-normal ${
            openMenu ? "opacity-0" : "opacity-100"
          }`}
        >
          <Link href="/home" className="md:text-2xl text-xl">
            Aguas de Ibiza
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className={`md:text-lg text-base ${
              isScrolled &&
              !openMenu &&
              "border-third text-black hover:border-white transition duration-300"
            }`}
          >
            Book now
          </Button>
          {openMenu ? (
            <HiMiniXMark
              className={`md:text-4xl text-2xl cursor-pointer ${
                isScrolled && !openMenu && "border-black text-black"
              }`}
              onClick={() => setOpenMenu(!openMenu)}
            />
          ) : (
            <RxHamburgerMenu
              className={`md:text-4xl text-2xl cursor-pointer ${
                isScrolled && "border-black text-black"
              }`}
              onClick={() => setOpenMenu(!openMenu)}
            />
          )}
        </div>
      </div>
      <div
        className={`bg-secondary lg:pl-32 lg:pr-20 lg:py-28 fixed top-0 sm:pl-20 sm:pr-16 sm: py-10 px-10 h-screen rb-top-animate animation-slow overflow-y-auto scrollbar-none ${
          openMenu ? "translate-y-[0px]" : "translate-y-[-1000px]"
        }`}
      >
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
          <nav className="col-span-1 md:col-span-2 lg:col-span-1">
            <ul className="flex flex-col gap-4">
              {pages.map((page) => (
                <li
                  key={page.id}
                  onMouseEnter={() => setImage(page.image)}
                  onMouseLeave={() =>
                    setImage(
                      "https://aguasdeibiza.com/wp-content/uploads/2019/01/salva-lopez-esvedra-aguasdeibiza-w-1200x857.jpg"
                    )
                  }
                  onClick={() => setOpenMenu(!openMenu)}
                  className="hover:text-gray-600 transition duration-300 w-fit"
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
          <nav className="col-1 md:col-2 lg:col-1 mt-10 md:mt-0 ">
            <ul className="flex flex-col gap-4">
              {features.map((feature) => (
                <li key={feature.id}>
                  <Link
                    href="#!"
                    className="lg:text-xl md:text-lg text-base hover:text-gray-600 transition duration-300 w-fit"
                  >
                    {feature.title}
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
        </div>
      </div>
      <motion.div className="progress-bar z-[9999]" style={{ scaleX }} />
    </header>
  );
};

export default Header;
