import { Disclosure, DisclosureButton } from "@headlessui/react";
import {
  AiOutlineMenu,
  AiFillHome,
  AiFillSetting,
  AiFillMessage,
} from "react-icons/ai";
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FiMoreHorizontal, FiLogOut } from "react-icons/fi";

export default function SideNavbar() {
  return (
    <div>
      <Disclosure as="nav">
        <DisclosureButton className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-900 hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:rind-white group">
          <AiOutlineMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </DisclosureButton>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:w-60 lg:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start items-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-gray-100 pb-4 w-full">
              TravelMate
            </h1>

            {/* Menu section */}
            <div className="my-4 border-b border-gray-100 pb-4 w-full">
              <div className="flex mb-2 justify-start items-center gap-5 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <AiFillHome className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Home
                </h3>
              </div>

              <div className="flex mb-2 justify-start items-center gap-5 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FaSearch className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Search
                </h3>
              </div>

              <div className="flex mb-2 justify-start items-center gap-5 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <IoNotifications className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Notifications
                </h3>
              </div>

              <div className="flex mb-2 justify-start items-center gap-5 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FaUserFriends className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Friends
                </h3>
              </div>

              <div className="flex mb-2 justify-start items-center gap-5 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <AiFillMessage className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Messages
                </h3>
              </div>
            </div>

            {/* Setting & More section */}
            <div className="my-4 border-b border-gray-100 pb-4 w-full">
              <div className="flex mb-2 justify-start items-center gap-5 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <AiFillSetting className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Setting
                </h3>
              </div>

              <div className="flex mb-2 justify-start items-center gap-5 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FiMoreHorizontal className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  More
                </h3>
              </div>
            </div>

            {/* Logout section */}
            <div className="my-4  w-full">
              <div className="flex mb-2 justify-center items-center gap-3 border border-gray-200 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FiLogOut className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Logout
                </h3>
              </div>
            </div>

          </div>
        </div>
      </Disclosure>
    </div>
  );
}
