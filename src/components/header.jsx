import React from "react";
import Image from "next/image";
import headerIcon from "@/../public/icon.png";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__branding">
          <Link href="/">
            <Image
              src={headerIcon}
              alt="GramAnalyse Icon"
              className="header__icon"
            />
            <h1 className="header__title">GramAnalyse</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
