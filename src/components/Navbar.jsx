import React, { useContext } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { logo } from "../assets/main";
import { CustomerContext } from "../context/CustomerContext";

const Navbar = () => {
  const { sidebarOpen, isSidebarOpen } = useContext(AuthContext);
  const { name } = useContext(CustomerContext);

  // function handleSidebar() {
  //   isSidebarOpen(!sidebarOpen);
  // }

  return (
    <nav className="relative bg-[#20265d] h-full flex items-center justify-between px-4 py-[2px] shadow shadow-b w-screen">
      {/* Left: Logo + Hamburger */}
      <div className="w-1/2 flex justify-start items-center pl-4 h-full gap-4">
        <button
          onClick={() => isSidebarOpen((prev) => !prev)}
          className="text-2xl  text-white flex items-center justify-center gap-2"
        >
          <FaBars />{" "}
        </button>
        {/* <div className="text-base font-mono text-white w-fit h-full flex flex-col justify-end items-end">
          {name.toUpperCase()}
        </div> */}
      </div>
      {/* <div className="absolute bottom-[2px] left-1/2 w-screen -translate-x-1/2 text-white  flex  justify-center items-center">
        <div className="text-base font-mono text-white w-fit">
          {name.toUpperCase()}
        </div>
      </div> */}
      <div className="flex justify-end items-center h-full overflow-hidden">
        {/* Hamburger Icon (visible on mobile) */}

        {/* Logo */}
        <div className="flex items-center gap-2 h-[10vh] text-white text-3xl font-semibold">
          <span>SKY Capital</span>
        </div>
      </div>

      {/* Right: Profile section */}
      {/* <div className="flex items-center gap-2 bg-white px-3 py-1 shadow-lg rounded-md text-black cursor-pointer text-sm md:text-base">
        <FaUser />
        <span className="hidden sm:block">Hari sdg</span>
        <IoMdArrowDropdown />
      </div> */}
    </nav>
  );
};

export default Navbar;
