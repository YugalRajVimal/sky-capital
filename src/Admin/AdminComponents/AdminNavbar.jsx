import React, { useContext, useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";

import { logo } from "../../assets/main";
import { IoMdArrowDropdown } from "react-icons/io";
import { AdminAuthContext } from "../AdminContext/AdminAuthContext";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const { isSidebarOpen } = useContext(AdminAuthContext);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  function handleDropdown() {
    setIsDropDownOpen(!isDropDownOpen);
  }

  return (
    <nav className="bg-[#20265d] flex items-center justify-between px-4 py-3 shadow shadow-b h-full w-screen">
      {/* Left: Logo + Hamburger */}
      <div className="w-1/3 flex justify-start items-center">
        <button
          onClick={() => isSidebarOpen((prev) => !prev)}
          className="text-2xl  text-white"
        >
          <FaBars />
        </button>
      </div>
      <div className="flex justify-center items-center w-1/3">
        {/* Hamburger Icon (visible on mobile) */}

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="3X future"
            className="h-8  object-contain shrink-0"
          />
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-center items-end relative">
        <div
          onClick={handleDropdown}
          className="flex w-fit items-center gap-2 bg-[#20265d] px-3 py-1 border border-white-[1px] rounded-md text-white cursor-pointer text-sm md:text-base hover:text-black hover:bg-gray-200"
        >
          <span className="hidden sm:block">Admin</span>
          <IoMdArrowDropdown />
        </div>
        {isDropDownOpen && (
          <ul
            className={`absolute top-[100%] bg-[#20265d] rounded-md shadow-lg text-base ${
              isDropDownOpen ? "animate-slideIn" : ""
            }`}
          >
            <li className="block px-4 py-2 text-white hover:bg-white hover:text-black">
              <Link to="/admin/admin-profile-details" className="">
                Profile
              </Link>
            </li>
            <li className="block px-4 py-2 text-white hover:bg-white hover:text-black">
              <Link to="/admin/logout" className="">
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
