import {
  faAlignJustify,
  faBasketShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext, useState } from "react";
import { idContext } from "../pages/_app";

export default function Navbar() {
  const { idHolder, setIdHolder } = useContext(idContext);

  const [navShow, setNavShow] = useState(false);

  const handleNavClick = () => {
    setNavShow(!navShow);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="grid grid-cols-3 justify-items-stretch py-5 px-3 w-full border-b-2 border-primary bg-forth">
        <div className="mt-1.5">
          <h1 className="text-secondary text-xl mt-1 font-bold">DRINFOOD</h1>
        </div>
        <div className="sm:flex hidden justify-between">
          <Link href="/">
            <a className="hover:bg-secondary/20 rounded-full pt-3.5 px-4">
              HOME
            </a>
          </Link>
          <a className="hover:bg-secondary/20 rounded-full pt-3.5 px-4 cursor-pointer">
            FOODS
          </a>
          <a className="hover:bg-secondary/20 rounded-full pt-3.5 px-4 cursor-pointer">
            LUNCH
          </a>
          <button className="hidden">
            <FontAwesomeIcon className="text-red-700" icon={faAlignJustify} />
          </button>
        </div>
        <div className="sm:flex hidden justify-end">
          <Link href="/profile">
            <a>
              <FontAwesomeIcon
                className="bg-secondary text-lg text-white mr-3 py-3 px-10 mt-1 rounded-md"
                icon={faUser}
              />
            </a>
          </Link>
          <div>
            <Link href="/cart">
              <a>
                <FontAwesomeIcon
                  className="bg-secondary text-white p-4 rounded-full"
                  icon={faBasketShopping}
                />
              </a>
            </Link>
            <p className="relative text-center w-2/5 -mt-4 bg-red-900 py-0.5 text-white text-xs font-semibold rounded-full">
              {idHolder.length}
            </p>
          </div>
        </div>
        <div></div>
        <div className="sm:hidden justify-self-end bg-secondary rounded-full">
          <FontAwesomeIcon
            onClick={handleNavClick}
            className="text-white px-4 py-2.5 mt-1 text-xl "
            icon={faAlignJustify}
          />
        </div>
      </div>
      {navShow ? (
        <div className="grid justify-items-end sm:hidden bg-forth py-4 rounded-b-2xl shadow-2xl absolute w-full">
          <div className="flex flex-row justify-between w-full px-5">
            <Link href="/">
              <a href="">HOME</a>
            </Link>
            <a href="">FOODS</a>
            <a href="">LUNCH</a>
            <button className="hidden">
              <FontAwesomeIcon className="text-red-700" icon={faAlignJustify} />
            </button>
          </div>
          <div className="w-full flex justify-between px-16 mt-6">
            <Link href="/profile">
              <a className="mr-3 bg-secondary px-5 pt-4 rounded-full text-white font-bold text-base">
                <FontAwesomeIcon icon={faUser} />
              </a>
            </Link>
            <div>
              <Link href="/cart">
                <a>
                  <FontAwesomeIcon
                    className="bg-secondary text-white p-4 rounded-full"
                    icon={faBasketShopping}
                  />
                </a>
              </Link>
              <p className="relative text-center w-2/5 -mt-4 bg-red-900 py-0.5 text-white text-xs font-semibold rounded-full">
                {idHolder.length}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
