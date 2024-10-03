import { Inter } from "next/font/google";
import Head from "next/head";
import SideNavbar from "./components/SideNavbar";
import { useSession } from "next-auth/react";
import TopBar from "./components/TopBar";
import PostCard from "./components/PostCard";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {
  // Fetch post data
  const { data: postData } = await axios.get(
    "http://localhost:1337/api/posts?populate=*"
  );

  // Fetch users data
  const { data: userData } = await axios.get(
    "http://localhost:1337/api/users?populate=*"
  );

  return {
    props: {
      posts: postData.data || [],
      users: userData || [],
    },
  };
};

export default function Home({ posts, users }) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  if (isLoading) return "Loading...";

  return (
    <div className="flex">
      <Head>
        <title>TravelMate</title>
        <meta name="description" content="TravelMate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
      <SideNavbar />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar title="Home" />

        {/* Main Content */}
        <div className="p-6 ml-72 mr-72 mt-16">
          <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  author={
                    post.attributes.authors?.data[0]?.id ||
                    post.attributes.authors?.data[0]?.attributes
                  }
                  title={post.attributes.title}
                  datetime={post.attributes.date}
                  description={post.attributes.description}
                  location={
                    post.attributes.location || "Location not available"
                  }
                  tags={post.attributes.tag}
                  participantNum={post.attributes.participantNum}
                  participants={post.attributes.participants?.data || []}
                  users={users}
                  authorFreeTimes={post.attributes.authorFreeTime || []}
                  participantsFreeTimes={post.attributes.participantFreeTimes || []}
                />
              ))
            ) : (
              <p>No upcoming events available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
