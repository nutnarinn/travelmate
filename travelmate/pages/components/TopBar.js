import React, { useState, useEffect } from "react";
import { HiArrowRight, HiBell, HiSearch } from "react-icons/hi";
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import ProfileDropdown from "./ProfileDropdown";
import LoginForm from "./LoginForm";
import Modal from "./Modal";
import SignUpForm from "./SignUpForm";
import axios from "axios";

export default function TopBar({ title }) {
  const { data: session } = useSession();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session) {
        try {
          // Fetch user data from Strapi
          const response = await axios.get(
            "http://localhost:1337/api/users?populate=*"
          );
          const user = response.data.find((u) => u.email === session.user.email);
          
          if (user && user.profilePicture) {
            setProfilePictureUrl(`http://localhost:1337${user.profilePicture.formats.thumbnail.url}`);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [session]);

  return (
    <div className="fixed top-0 left-60 right-0 bg-white shadow-md z-10 flex justify-between items-center py-4 px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* Search Bar */}
      <div className="flex items-center space-x-16 ml-auto">
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <HiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search here..."
            className="w-full py-2 pl-12 pr-20 border rounded-md focus:outline-none focus:border-[#54BEC1]"
          />
        </div>

        {/* Notification and Message Icons */}
        <div className="flex items-center ml-6">
          {session ? (
            <>
              <div className="mr-6 relative group">
                <div className="p-2 rounded-full group-hover:bg-gray-100 transition duration-200">
                  <HiChatBubbleLeftEllipsis className="cursor-pointer w-7 h-7 text-gray-500 group-hover:text-gray-700" />
                </div>
                <span className="absolute top-1.5 right-1.5 inline-block w-3 h-3 bg-red-600 rounded-full"></span>
              </div>

              <div className="mr-9 relative group">
                <div className="p-2 rounded-full group-hover:bg-gray-100 transition duration-200">
                  <HiBell className="cursor-pointer w-7 h-7 text-gray-500 group-hover:text-gray-700" />
                </div>
                <span className="absolute top-1.5 right-2 inline-block w-3 h-3 bg-red-600 rounded-full"></span>
              </div>

              <ProfileDropdown session={session} profilePicture={profilePictureUrl} />
            </>
          ) : (
            <>
              <button
                className="mr-4 bg-transparent text-[#FF8C54] px-4 py-1.5 rounded-lg border-2 border-[#FF8C54] relative group"
                onClick={() => setShowLogin(true)}
              >
                Log in
                <HiArrowRight className="inline-block ml-2 w-0 h-0 opacity-0 group-hover:w-4 group-hover:h-4 group-hover:opacity-100 transition-all duration-300" />
              </button>

              <Modal show={showLogin} onClose={() => setShowLogin(false)}>
                <LoginForm />
              </Modal>

              <button
                className="bg-[#FF8C54] text-white px-4 py-2 rounded-lg relative group"
                onClick={() => setShowSignup(true)}
              >
                Create Account
                <HiArrowRight className="inline-block ml-2 w-0 h-0 opacity-0 group-hover:w-4 group-hover:h-4 group-hover:opacity-100 transition-all duration-300" />
              </button>

              <Modal show={showSignup} onClose={() => setShowSignup(false)}>
                <SignUpForm />
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
