import { useState } from "react";
import { HiChevronDown, HiLogout } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfileDropdown({ session }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      {session && (
        <div className="flex items-center space-x-3">
          <div
            className="cursor-pointer flex items-center space-x-2 hover:bg-gray-100 px-2 py-2 rounded-full"
            onClick={toggleDropdown}
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            )}
            <HiChevronDown className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      )}

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white border rounded-md shadow-lg">
          <ul className="py-2">
            {/* Section 1: User Account */}
            <li className="px-4 py-2 flex items-center">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              )}
              <div className="ml-2">
                <span className="font-semibold">{session.user.name}</span>
                <span className="block text-gray-500 text-sm">
                  {session.user.email}
                </span>
              </div>
            </li>

            {/* Divider */}
            <li className="border-t border-gray-300 w-11/12 mx-auto my-2"></li>

            {/* Section 2: My Profile and Log Out */}
            <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
              <Link href="/profile" className="flex items-center w-full">
                <HiUserCircle className="w-5 h-5 mr-2 text-gray-500" />
                My Profile
              </Link>
            </li>
            <li
              className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
              onClick={() => signOut()}
            >
              <HiLogout className="w-5 h-5 mr-2 text-gray-500" />
              Log Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
