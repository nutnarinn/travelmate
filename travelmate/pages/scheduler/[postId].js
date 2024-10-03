import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNavbar from "../components/SideNavbar";
import TopBar from "../components/TopBar";
import FreeTimeScheduler from "../components/FreeTimeScheduler";

export const getServerSideProps = async (context) => {
  const { postId } = context.params;

  try {
    // Fetch post data based on postId
    const { data: postData } = await axios.get(
      `http://localhost:1337/api/posts/${postId}?populate=*`
    );

    // Fetch users data
    const { data: userData } = await axios.get(
      "http://localhost:1337/api/users?populate=*"
    );

    return {
      props: {
        post: postData?.data || null,
        users: userData || [],
      },
    };
  } catch (error) {
    console.error("Error fetching post data:", error);
    return {
      props: {
        post: null,
        users: [],
      },
    };
  }
};

export default function SchedulerPage({ post, users }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (post) {
      setLoading(false);
    }
  }, [post]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Error: Post not found.</div>;
  }

  const authorFreeTimes = post.attributes.authorFreeTime || [];
  const author = post.attributes.authors?.data[0] || null;
  const participants = post.attributes.participants?.data || [];
  const participantsFreeTimes = post.attributes.participantFreeTimes || [];

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <SideNavbar />

      {/* TopBar */}
      <TopBar title="Free Time Scheduler" />

      {/* Main Content */}
      <div className="p-6 ml-56 mr-72 mt-16">
        <div className="w-full max-w-6xl h-full max-h-[80vh]">
          <FreeTimeScheduler
            authorFreeTimes={authorFreeTimes}
            participantsFreeTimes={participantsFreeTimes}
            author={author}
            participants={participants}
            users={users}
          />
        </div>
      </div>
    </div>
  );
}
