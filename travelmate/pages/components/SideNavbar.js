import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import {
  AiOutlineMenu,
  AiFillHome,
  AiFillSetting,
  AiFillMessage,
} from "react-icons/ai";
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { BiSolidUserCircle } from "react-icons/bi";

export default function SideNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Disclosure as="nav">
        {/* Menu button */}
        <DisclosureButton
          className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-900 hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
          onClick={toggleNavbar}
          aria-hidden={!isOpen}
        >
          <AiOutlineMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </DisclosureButton>
        {/* Sidebar */}
        <div
          className={`p-6 w-1/2 h-screen bg-white z-20 fixed top-0 ${
            isOpen ? "left-0" : "-left-96"
          } lg:w-60 lg:left-0 transition-all ease-out delay-150 duration-500`}
          aria-hidden={!isOpen}
        >
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

              {/* Conditional rendering for authorized users */}
              {session && (
                <>
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

                  <div className="flex mb-2 justify-start items-center gap-5 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <BiSolidUserCircle className="text-2xl text-gray-600 group-hover:text-white " />
                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                      Profile
                    </h3>
                  </div>

                  <div className="flex mb-2 justify-start items-center gap-5 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <AiFillSetting className="text-2xl text-gray-600 group-hover:text-white " />
                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                      Setting
                    </h3>
                  </div>
                </>
              )}
            </div>

            {session ? (
              // For authorized users
              <div className="my-4 w-full">
                <div
                  className="flex mb-2 justify-center items-center gap-3 border border-gray-200 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                  onClick={() => signOut()}
                >
                  <FiLogOut className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Sign out
                  </h3>
                </div>
              </div>
            ) : (
              // For unauthorized users
              <div className="my-4 w-full text-center">
                <div
                  className="flex mb-2 justify-center items-center gap-3 border bg-gray-900 hover:border-gray-200 hover:bg-gray-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto mt-2"
                  onClick={() => signIn()}
                >
                  <FiLogOut className="text-2xl text-white " />
                  <h3 className="text-base text-white group-hover:text-white font-semibold">
                    Log in
                  </h3>
                </div>
                <div
                  className="flex mb-2 justify-center items-center gap-3 border border-gray-200 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                  onClick={() => signIn("signup")}
                >
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Create an account
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </Disclosure>
    </div>
  );
}
