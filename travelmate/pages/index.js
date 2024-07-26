import { Inter } from "next/font/google";
import Head from "next/head";
import SideNavbar from "./components/SideNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>TravelMate</title>
        <meta name = "description" content = "TravelMate" />
        <link rel = "icon" href = "/favicon.ico" />
      </Head>
      <SideNavbar />
    </div>
  );
}
