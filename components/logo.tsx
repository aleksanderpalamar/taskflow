import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center">
        <div className="items-center hover:opacity-75 transition gap-x-2 hidden md:flex">
          <Globe className="w-[30] h-[30]" />
          <h1
            className={cn(
              "font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600",
              poppins.className
            )}
          >
            TaskFlow
          </h1>
        </div>
      </div>
    </Link>
  );
};
