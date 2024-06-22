import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Login from "./Login";
export default function Home() {
  return (
    <main
      className={`bg-gray-100 flex items-center justify-center h-screen min-h-screen flex-col p-24 ${inter.className}`} 
    >
      <Login></Login>
    </main>
  );
}
