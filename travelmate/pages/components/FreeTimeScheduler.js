import React, { useState } from "react";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import { findBestMatches } from "./findBestMatches";
import "react-calendar-timeline/lib/Timeline.css";
import { HiOutlineClock } from "react-icons/hi2";

const FreeTimeScheduler = ({
  authorFreeTimes,
  participantsFreeTimes,
  author,
  participants,
  users = [],
}) => {
  // Get user profile picture
  const getUserProfilePicture = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user && user.profilePicture) {
      return `http://localhost:1337${user.profilePicture.formats.thumbnail.url}`;
    }
    return "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Default avatar
  };

  const groups = [
    {
      id: 1,
      title: (
        <div className="flex items-center">
          <img
            src={getUserProfilePicture(author.id)}
            alt="author avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          {`${author?.attributes?.username} (Author)`}
        </div>
      ),
    },
    ...participants.map((participant, index) => ({
      id: index + 2,
      title: (
        <div className="flex items-center">
          <img
            src={getUserProfilePicture(participant.id)}
            alt={`${participant.attributes.username}'s avatar`}
            className="w-8 h-8 rounded-full mr-2"
          />
          {participant.attributes.username}
        </div>
      ),
    })),
    { id: participants.length + 2, title: "Best Overlaps" },
  ];

  const items = [];

  // Add author's free time
  authorFreeTimes.forEach((time, index) => {
    items.push({
      id: `author-${index}`,
      group: 1,
      title: author?.attributes?.username,
      start_time: moment(time.start),
      end_time: moment(time.end),
      itemProps: {
        style: { background: "#8BD9DF", color: "black" },
      },
    });
  });

  // Add participants' free times
  participantsFreeTimes.forEach((participantTimes, pIndex) => {
    participantTimes.freeTimes.forEach((time, index) => {
      items.push({
        id: `participant-${pIndex}-${index}`,
        group: pIndex + 2,
        title: `${participants[pIndex].attributes.username}`,
        start_time: moment(time.start),
        end_time: moment(time.end),
        itemProps: {
          style: { background: "#FF8C54", color: "white" },
        },
      });
    });
  });

  // Find and add best overlaps
  const { overlapIntervals } = findBestMatches(
    authorFreeTimes,
    participantsFreeTimes.map((pt) => pt.freeTimes)
  );
  
  if (overlapIntervals && overlapIntervals.length > 0) {
    overlapIntervals.forEach((overlap, index) => {
      items.push({
        id: `best-overlap-${index}`,
        group: participants.length + 2,
        title: "Best Overlap",
        start_time: moment(overlap.start),
        end_time: moment(overlap.end),
        itemProps: {
          style: { background: "green", color: "white" },
        },
      });
    });
  }

  // State for time range and view type (only "day" view)
  const [currentTime] = useState(
    authorFreeTimes.length > 0
      ? moment(authorFreeTimes[0].start).startOf("day")
      : moment().startOf("day")
  );

  // Calculate visible time range for a single day
  const visibleTimeStart = currentTime.clone().startOf("day").valueOf();
  const visibleTimeEnd = currentTime.clone().endOf("day").valueOf();

  return (
    <div className="p-6">
      <div className="border rounded-lg p-4 shadow-lg bg-white">
        {/* Timeline Component */}
        <Timeline
          groups={groups}
          items={items}
          buffer={1}
          sidebarWidth={220}
          itemHeightRatio={1}
          lineHeight={60}
          canMove={false}
          canResize={false}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          minZoom={60 * 60 * 1000} // 1 hour
          maxZoom={60 * 60 * 24 * 1000} // 1 day
          timeSteps={{ second: 0, minute: 0, hour: 1, day: 1 }}
        />

        {/* Show bestOverlaps */}
        <div className="mt-4">
          <h1 className="text-2xl font-semibold mb-4">Best Overlap Times</h1>
          {overlapIntervals && overlapIntervals.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {overlapIntervals.map((overlap, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center">
                    <HiOutlineClock className="text-5xl text-[#54BEC1] mr-4" />
                    <div className="text-gray-700">
                      <span className="text-xl font-semibold mb-2">
                        {moment(overlap.start).format("ddd, MMM D, YYYY")}
                      </span>
                      <br />
                      <span className="block text-lg">
                        {moment(overlap.start).format("h:mm A")} -{" "}
                        {moment(overlap.end).format("h:mm A")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No best overlap times found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreeTimeScheduler;
