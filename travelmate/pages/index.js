import { Inter } from "next/font/google";
import Head from "next/head";
import SideNavbar from "./components/SideNavbar";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      <SideNavbar />
      <div className="flex-1 flex items-center justify-center h-screen ml-60">
        {session ? (
          <h1 className="text-3xl font-bold">Welcome, {session.user.name}</h1>
        ) : (
          <h1 className="text-3xl font-bold">Welcome, Guest</h1>
        )}
      </div>
    </div>
  );
}
