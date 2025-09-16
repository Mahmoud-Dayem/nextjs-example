import Image from "next/image";
import { classes } from "./style";
import Header from '../components/Header';

export default function Home() {
  const headingClass = "text-4xl font-bold text-blue-500";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-8 pb-20 sm:p-20">
       </main>
    </div>
  );
}
