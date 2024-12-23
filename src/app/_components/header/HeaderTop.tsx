import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiMiniXMark } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiUser } from "react-icons/ci";
import { FaSignOutAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";

const HeaderTop = ({
  isScrolled,
  openMenu,
  setOpenMenu,
}: {
  isScrolled: boolean;
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
}) => {
  return (
    <div
      className={`flex justify-between items-center md:px-10 py-4 sm:px-6 px-3 relative z-[2] `}
    >
      <div
        className={`text-sm lg:block hidden animation-normal ${
          isScrolled && "text-black"
        } ${openMenu ? "opacity-0 " : "opacity-100"}`}
      >
        <Link href="/home">
          <span>
            Grand Luxe <br />
            Hotel
          </span>
        </Link>
      </div>
      <div
        className={`animation-normal ${openMenu ? "opacity-0" : "opacity-100"}`}
      >
        <Link href="/home" className="md:text-2xl text-xl ">
          Aguas de Ibiza
        </Link>
      </div>
      <div className="flex items-center sm:gap-4 gap-2">
        <Button
          variant="outline"
          className={`text-size-lg animation-normal ${
            isScrolled &&
            !openMenu &&
            "border-third text-third hover:border-white"
          } ${openMenu ? "hover:bg-primary hover:text-secondary" : ""}`}
        >
          Book now
        </Button>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={`text-size-4xl animation-normal cursor-pointer ${
                  isScrolled && !openMenu && "text-third hover:text-secondary"
                } ${openMenu && " hover:text-primary-foreground"}`}
              >
                <CiUser />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 mt-2 bg-secondary text-primary">
              <DropdownMenuLabel className="text-xl">
                My Account
              </DropdownMenuLabel>
              <div className="line-1 my-2 bg-primary" />
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="hover:bg-secondary hover:text-primary">
                <DropdownMenuItem className="text-lg cursor-pointer">
                  <Link href="#!">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-lg cursor-pointer">
                  <Link href="#!">Cart</Link>
                  <DropdownMenuShortcut className="relative">
                    <FiShoppingCart className="text-lg" />
                    <span className="w-5 h-5 flex items-center justify-center absolute -top-3 -right-3 bg-primary text-secondary rounded-full">
                      12
                    </span>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuItem className="text-lg cursor-pointer">
                <Link href="#!">GitHub</Link>
                <DropdownMenuShortcut>
                  <FaGithub className="text-lg" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-lg cursor-pointer">
                <Link href="#!">Log out</Link>
                <DropdownMenuShortcut>
                  <FaSignOutAlt className="text-lg" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {openMenu ? (
          <HiMiniXMark
            className={`md:text-4xl text-2xl cursor-pointer animation-fast  ${
              isScrolled && !openMenu && "hover:text-secondary"
            } ${openMenu && "hover:text-primary-foreground"}`}
            onClick={() => setOpenMenu(!openMenu)}
          />
        ) : (
          <RxHamburgerMenu
            className={`md:text-4xl text-2xl cursor-pointer animation-fast ${
              isScrolled && "text-third hover:text-secondary"
            }`}
            onClick={() => setOpenMenu(!openMenu)}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderTop;
