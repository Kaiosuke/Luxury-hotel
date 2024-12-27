"use client";
import useDetectScroll from "@smakss/react-scroll-direction";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderMainPages from "./HeaderMainPages";
import HeaderSubPages from "./HeaderSubPages";
import HeaderTop from "./HeaderTop";
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/selectors/authSelector";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollDir } = useDetectScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { currentUser } = useSelector(authSelector);

  return (
    <header
      className={`text-primary fixed w-full z-[40] animation-slow
        ${isScrolled ? "bg-primary" : "bg-transparent"} 
        ${
          isScrolled && scrollDir === "down"
            ? "translate-y-[-1000px]"
            : "translate-y-[0]"
        }
        `}
    >
      <HeaderTop
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        isScrolled={isScrolled}
      />
      <div
        className={`bg-secondary lg:pl-32 lg:pr-20 lg:py-28 fixed top-0 sm:pl-20 sm:pr-16 sm: py-10 px-10 h-screen rb-top-animate animation-slow overflow-y-auto scrollbar-none ${
          openMenu ? "translate-y-[0px]" : "translate-y-[-1000px]"
        }`}
      >
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
          <HeaderMainPages openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <HeaderSubPages />
          {!currentUser && (
            <div>
              <Link
                href="/auth"
                className="link-under text-primary hover:text-primary-textOpacity hover:decoration-primary-textOpacity"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
