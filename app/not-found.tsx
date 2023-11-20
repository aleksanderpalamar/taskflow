"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Navbar } from "./(marketing)/_components/navbar";
import { Footer } from "./(marketing)/_components/footer";

const NotFound = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.back();
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-slate-100 dark:bg-slate-900 p-4">
        <div className="flex flex-col gap-y-4 text-center items-center">
          <h2 className="text-xl text-zinc-800 dark:text-zinc-100 flex items-center antialiased">
            <span
              className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 text-white
        px-4 p-2 rounded-md pb-4 mr-2"
            >
              404
            </span>
            {" | "}
            Page Not Found
          </h2>
          <p className="text-md font-light text-rose-500 mt-4 break-words antialiased">
            The page you are looking for does not exist.
          </p>
          <Button variant="outline" size="sm" onClick={handleOnClick}>
            Go Back
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
