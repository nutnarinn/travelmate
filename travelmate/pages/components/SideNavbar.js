import React from "react";
import { HiSearch, HiBell, HiMail, HiQuestionMarkCircle } from "react-icons/hi";
import {
  HiHome,
  HiCalendarDays,
  HiUserCircle,
  HiCog6Tooth,
} from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SideNavbar() {
  const { data: session } = useSession();

  return (
    <div className="fixed inset-y-0 left-0 w-60 bg-white shadow-md flex flex-col justify-between">
      {/* Logo and Navigation */}
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center mb-8">
            <Image
              src="/travelmate_logo.svg"
              alt="Logo"
              width={32}
              height={32}
            />
            <h1 className="text-2xl font-bold text-[#54BEC1] ml-4">
              TravelMate
            </h1>
          </div>

          {/* Section 1: Main Navigation */}
          <div className="space-y-4 mb-8">
            <Link
              href="/"
              className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg"
            >
              <HiHome className="w-6 h-6 mr-3" />
              Home
            </Link>

            <Link
              href="/search"
              className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg"
            >
              <HiSearch className="w-6 h-6 mr-3" />
              Search
            </Link>

            {session && (
              <>
              <Link
              href="/calendar"
              className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg"
            >
              <HiCalendarDays className="w-6 h-6 mr-3" />
              Calendar
            </Link>

            <Link
              href="/notifications"
              className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg"
            >
              <HiBell className="w-6 h-6 mr-3" />
              Notifications
            </Link>

            <Link
              href="/messages"
              className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg"
            >
              <HiMail className="w-6 h-6 mr-3" />
              Messages
            </Link>
            </>
            )}

            
          </div>
        </div>

        {/* Section 2: Settings and Help Support at the bottom */}
        <div>
          <div className="border-t border-gray-200 my-6"></div>
          <div className="space-y-4">
            <Link
              href="/settings"
              className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg"
            >
              <HiCog6Tooth className="w-6 h-6 mr-3" />
              Settings
            </Link>

            <Link
              href="/help"
              className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg"
            >
              <HiQuestionMarkCircle className="w-6 h-6 mr-3" />
              Help & Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
