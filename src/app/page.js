import Image from "next/image";
import { classes } from "./style";
export default function Home() {
  const headingClass = "text-4xl font-bold text-blue-500";

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className={classes.heading}>Mahmoud</h1>
    </div>
  );
}
