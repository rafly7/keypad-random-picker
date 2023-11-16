"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HomeNavLink from "./HomeNavLink";
import ThemeToggleIcon from "@/components/ThemeSelection/ThemeToggleIcon";
import { Routes } from "@/types/routes";
import Hamburger from "@/components/dls/Hamburger";
import Image from "next/image";

const HomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isInHomePage =
    !pathname?.includes("auth") &&
    (pathname?.includes("about") || pathname === "/");

  const isInAuthPage = pathname?.includes("auth");

  // hide nav in app and demo pages
  if (pathname?.includes("app") || pathname?.includes("demo") || pathname?.includes("form-nda")) return <></>;

  return (
    <header
      className={classNames(
        "transition-all duration-300 ease-out z-50",
        {
          "left-1/2 top-10 lg:top-20 w-72 -translate-x-1/2 max-w-xl absolute":
            isInAuthPage,
        },
        {
          "left-0 top-0 max-w-full w-full fixed": isInHomePage,
        }
      )}
    >
      <nav
        className={classNames(
          "items-center flex gap-3",
          {
            "px-5 py-5 md:px-10 bg-[#95a5a6] border-b dark:bg-primaryDarkColor dark:border-slate-700":
              isInHomePage,
          }
        )}
      >
        <Link href='#'>
          <div className="relative flex w-9 h-9">
            <Image fill alt='logo-brand' src='/assets/images/logo_brand.png' className="object-cover" />
          </div>
        </Link>
        {isInHomePage ? (
          <Link
            href={Routes.Home}
            className="mr-3 flex-1 text-customWhite dark:text-slate-200 font-semibold text-2xl tracking-widest"
          >
            Keypad
          </Link>
        ) : (
          <HomeNavLink isActive={pathname === Routes.Home} href={Routes.Home}>
            Home
          </HomeNavLink>
        )}

        <div
          className={classNames(
            {
              "md:flex color-white items-center absolute md:static w-full md:w-fit left-0 top-14 py-2 px-3 md:py-0 md:px-0 transition-all md:bg-none shadow-lg shadow-neutral-600/10  dark:bg-slate-8 00 dark:shadow-slate-800/50 md:shadow-none md:visible overflow-hidden gap-8":
                isInHomePage,
            },

            {
              "visible max-h-44 bg-inherit": isOpen,
            },
            {
              "space-y-4 md:space-y-0 border-b dark:border-slate-700":
                isInHomePage && isOpen,
            },
            {
              "invisible md:visible md:max-h-16 max-h-0":
                !isOpen && isInHomePage,
            }
          )}
        >
        </div>
        {isInHomePage && (
          <>
            <ThemeToggleIcon />
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={classNames("md:hidden")}
            >
              <Hamburger isOpen={isOpen} />
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default HomeNav;
