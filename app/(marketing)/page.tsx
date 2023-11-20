import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";
import { Poppins, Roboto } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          poppins.className
        )}
      >
        <div
          className="mb-4 flex items-center border shadow-sm p-4
        bg-amber-100 text-amber-700 rounded-full uppercase"
        >
          <Medal className="w-6 h-6 mr-2" />
          Task management with no effort
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          <span className="font-bold">TaskFlow</span> helps team move
        </h1>
        <div
          className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 text-white
        px-4 p-2 rounded-md pb-4"
        >
          work forward
        </div>
      </div>
      <div
        className={cn(
          "mt-4 text-sm md:text-xl text-neutral-400 max-w-xs md:max-w-2xl text-center mx-auto",
          roboto.className
        )}
      >
        Collaborate, manage project, and reach new productivity levels. From
        highly, regarded projects to mind-blowing initiatives, we accomplish it
        all with TaskFlow.
      </div>
      <Button className="mt-8" size="lg" asChild>
        <Link href="/sign-up">Get TaskFlow for free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
