import React from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { BsGithub } from "react-icons/bs";
import { FaDonate } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex flex-row justify-between items-center p-2 border-b">
      <div>
        <Link href="/">
          <Image
            src={Logo}
            width={40}
            height={40}
            alt="LinkNote"
            title="LinkNote"
          />
        </Link>
      </div>
      <div className="flex flex-row justify-between items-center">
        <button
          className="flex flex-row gap-2 justify-center items-center bg-gray-100 border-0 
          focus:outline-none hover:bg-gray-200 rounded text-base"
          title="Donate"
          style={{ width: "40px", height: "40px" }}
        >
          <FaDonate />
        </button>
        <button
          className="flex flex-row gap-2 justify-center items-center bg-gray-100 border-0 
          focus:outline-none hover:bg-gray-200 rounded text-base"
          style={{ width: "40px", height: "40px" }}
          title="GitHub"
        >
          <BsGithub />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
