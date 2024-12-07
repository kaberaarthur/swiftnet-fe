import { ImagePath } from "@/Constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MainHeader from "./MainHeader/MainHeader";
import CloseButton from "./CloseButton/CloseButton";

const Header = () => {
  return (
    <header className="page-header row">
      <div className="logo-wrapper d-flex align-items-center col-auto">
        <Link href={`/dashboard/default`}>
          <Image width={106} height={37} className="for-dark" src={`${ImagePath}/logo/dark-logo.png`} alt="logo" />
          <Image width={106} height={37} className="for-light" src={`${ImagePath}/logo/logo.png`} alt="logo" />
        </Link>
        <CloseButton />
      </div>
      <MainHeader />
    </header>
  );
};

export default Header;
