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
import { authSelector } from "@/redux/selectors/authSelector";
import { cartUserRemainingSelector } from "@/redux/selectors/cartsSelector";
import { loginUser } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import { signOut } from "next-auth/react";
import { CiUser } from "react-icons/ci";
import { FaSignOutAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { useSelector } from "react-redux";

const HeaderTop = ({
  isScrolled,
  openMenu,
  setOpenMenu,
}: {
  isScrolled: boolean;
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();

  const { currentUser } = useSelector(authSelector);
  const { cartsUsers } = useSelector(cartUserRemainingSelector);

  const handleSigOut = () => {
    signOut();
    dispatch(loginUser(null));
  };

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
        <Link href="/booking">
          <Button
            variant="outline"
            className={`text-size-lg animation-normal ${
              isScrolled &&
              !openMenu &&
              "border-third text-third hover:border-primary hover:bg-secondary"
            } ${openMenu ? "hover:bg-primary hover:text-secondary" : ""}`}
          >
            Book now
          </Button>
        </Link>
        <div>
          {currentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className={`text-size-4xl animation-normal cursor-pointer hover:opacity-50 ${
                    isScrolled && !openMenu && "text-third"
                  } `}
                >
                  <CiUser />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 mt-2 bg-secondary text-primary">
                <DropdownMenuLabel className="text-xl flex gap-2">
                  {currentUser.role === "ceo" && <div>Hi Boss:</div>}
                  {currentUser.role === "admin" && <div>Hi Admin:</div>}
                  <span>{currentUser.username}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="#!">
                    <DropdownMenuItem className="text-lg cursor-pointer hover:bg-primary hover:text-secondary">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  {currentUser?.role !== "user" && (
                    <Link href="/admin">
                      <DropdownMenuItem className="text-lg cursor-pointer hover:bg-primary hover:text-secondary">
                        Dash Board
                        <DropdownMenuShortcut>
                          <MdOutlineDashboard className="text-lg" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  {currentUser && (
                    <Link href="/cart">
                      <DropdownMenuItem className="text-lg cursor-pointer hover:bg-primary hover:text-secondary">
                        Cart
                        <DropdownMenuShortcut className="relative">
                          <FiShoppingCart className="text-lg" />
                          <span className="w-5 h-5 flex items-center justify-center absolute -top-3 -right-3 bg-primary text-secondary rounded-full">
                            {cartsUsers.length}
                          </span>
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  )}
                </DropdownMenuGroup>
                <Link href="https://github.com/Kaiosuke">
                  <DropdownMenuItem className="text-lg cursor-pointer hover:bg-primary hover:text-secondary">
                    GitHub
                    <DropdownMenuShortcut>
                      <FaGithub className="text-lg" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                {currentUser && (
                  <DropdownMenuItem
                    className="text-lg cursor-pointer hover:bg-primary hover:text-secondary"
                    onClick={handleSigOut}
                  >
                    Log out
                    <DropdownMenuShortcut>
                      <FaSignOutAlt className="text-lg" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {openMenu ? (
          <HiMiniXMark
            className={`text-size-4xl cursor-pointer hover:opacity-50 ${
              isScrolled && !openMenu && "text-third"
            } `}
            onClick={() => setOpenMenu(!openMenu)}
          />
        ) : (
          <RxHamburgerMenu
            className={`text-size-4xl cursor-pointer hover:opacity-50 ${
              isScrolled && !openMenu && "text-third"
            } `}
            onClick={() => setOpenMenu(!openMenu)}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderTop;
