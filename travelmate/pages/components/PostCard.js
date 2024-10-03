import React, { useEffect, useState } from "react";
import { HiLocationMarker, HiUserGroup } from "react-icons/hi";
import { HiMiniCalendarDays, HiOutlineStar, HiStar } from "react-icons/hi2";
import { checkStatus } from "./checkStatus";
import Link from "next/link";

export default function PostCard({
  id,
  title,
  datetime,
  description,
  location,
  tags,
  participantNum,
  author,
  participants = [],
  authorFreeTimes = [],
  participantsFreeTimes = [],
  users = [],
}) {
  const [placeName, setPlaceName] = useState("Fetching location...");
  const [isStarred, setIsStarred] = useState(false);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const fetchStatus = async () => {
      const calculatedStatus = await checkStatus(id);
      setStatus(calculatedStatus);
    };

    fetchStatus();

    const getPlaceDetails = async () => {
      if (location?.coordinates) {
        try {
          const { lat, lng } = location.coordinates;
          const geocodeResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
          const geocodeData = await geocodeResponse.json();

          if (geocodeData.results.length > 0) {
            const placeId = geocodeData.results[0].place_id;
            const placeDetailsResponse = await fetch(
              `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
            );
            const placeDetailsData = await placeDetailsResponse.json();

            if (placeDetailsData.result) {
              setPlaceName(placeDetailsData.result.name);
            } else {
              setPlaceName("Place details not found");
            }
          } else {
            setPlaceName("Location not found");
          }
        } catch (error) {
          console.error("Error fetching place details:", error);
          setPlaceName("Error fetching place details");
        }
      }
    };

    getPlaceDetails();
  }, [id, location?.coordinates]);

  const handleStarClick = () => {
    setIsStarred(!isStarred);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-200 text-green-500";
      case "Partial Match":
        return "bg-yellow-200 text-yellow-500";
      case "No Match":
        return "bg-red-200 text-red-500";
      case "Pending":
        return "bg-gray-200 text-gray-500";
      default:
        return "bg-gray-200 text-gray-500";
    }
  };

  // Get user profile picture
  const getUserProfilePicture = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user && user.profilePicture) {
      return `http://localhost:1337${user.profilePicture.formats.thumbnail.url}`;
    }
    return "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Default avatar
  };

  // Get author profile picture
  const getAuthorProfilePicture = () => {
    if (author?.profilePicture) {
      return `http://localhost:1337${author.profilePicture.formats.thumbnail.url}`;
    }
    if (typeof author === "number") {
      return getUserProfilePicture(author);
    }
    return "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Default avatar
  };

  // Get author username
  const getAuthorUsername = () => {
    if (author?.username) {
      return author.username;
    }
    if (typeof author === "number") {
      const user = users.find((user) => user.id === author);
      return user ? user.username : "Unknown User";
    }
    return "Unknown User";
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6">
      {/* Author, Status Badge, and Star Button in the same line */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={getAuthorProfilePicture()}
            alt="Author"
            className="w-10 h-10 rounded-full mr-4"
          />
          <h3 className="text-lg font-bold">{getAuthorUsername()}</h3>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusBadge(
              status
            )}`}
          >
            {status}
          </div>
          <button
            className="p-2 text-gray-500 hover:text-yellow-500"
            onClick={handleStarClick}
          >
            {isStarred ? (
              <HiStar className="text-2xl text-yellow-500" />
            ) : (
              <HiOutlineStar className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Post Title */}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {/* Description */}
      {description ? (
        <p className="text-gray-700 mb-4">{description}</p>
      ) : (
        <p className="mb-4"></p>
      )}

      {/* Date & Participants */}
      <div className="flex items-center text-sm text-[#FF8C54] mb-4">
        <HiMiniCalendarDays className="mr-1 text-xl" />
        <span>
          {new Date(datetime).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>

        <HiUserGroup className="mr-1 ml-4 text-xl" />
        <span>
          {participants.length} / {participantNum} people
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center text-sm text-gray-700 mb-2">
        <HiLocationMarker className="mr-1 text-xl text-red-600" />
        <span>{placeName}</span>
      </div>

      {/* Tags, View Details, and Join Button */}
      <div className="flex items-center justify-between mt-4">
        {/* Tags */}
        {tags && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#8BD9DF] bg-opacity-60 text-[#54BEC1] px-2 py-1 rounded-full text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* View Details and Join Button */}
        <div className="flex gap-4">
          <Link href={`/scheduler/${id}`}>
            <span className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 text-md font-semibold py-2 px-3 rounded cursor-pointer inline-block">
              View details
            </span>
          </Link>

          {/* Join Button */}
          <button className="bg-[#FF8C54] hover:bg-[#FF8C54]/90 text-white font-semibold py-2 px-4 rounded">
            Join
          </button>
        </div>
      </div>

      {participants.length > 0 && (
        <>
          {/* Divider */}
          <hr className="border-gray-300 my-4" />

          {/* Participant Avatars */}
          <div className="relative flex items-center space-x-2 mt-4">
            <div className="flex -space-x-2">
              {participants.map((participant) => (
                <div className="relative group" key={participant.id}>
                  <img
                    src={getUserProfilePicture(participant.id)}
                    alt={participant.attributes.username}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  />
                  {/* Tooltip with participant username */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-10 hidden group-hover:flex items-center justify-center px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-lg">
                    {participant.attributes.username}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-[-4px] h-2 w-2 bg-gray-700 rotate-45"></div>
                  </div>
                </div>
              ))}
            </div>

            <span className="ml-4 text-gray-500">
              <span className="font-semibold text-[#54BEC1]">
                {participants[0].attributes.username}
              </span>{" "}
              {participants.length > 1 && (
                <>
                  and{" "}
                  <span className="relative group cursor-pointer font-semibold text-[#54BEC1]">
                    {participants.length - 1}{" "}
                    {participants.length - 1 === 1 ? "other" : "others"}
                    {/* Tooltip for the other participants */}
                    <div className="absolute z-10 hidden group-hover:flex flex-col items-center left-1/2 transform -translate-x-1/2 top-7 px-4 py-2 text-xs text-white bg-gray-700 rounded-md shadow-lg">
                      {participants.slice(1).map((otherParticipant) => (
                        <span key={otherParticipant.id}>
                          {otherParticipant.attributes.username}
                        </span>
                      ))}
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-[-4px] h-2 w-2 bg-gray-700 rotate-45"></div>
                    </div>
                  </span>
                </>
              )}{" "}
              joined
            </span>
          </div>
        </>
      )}
    </div>
  );
}
