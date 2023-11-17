import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full px-4 py-2 border-t bg-slate-100">
      <div
        className="md:max-w-screen-2xl mx-auto flex
      items-center w-full justify-between"
      >
        <Logo />
        <div className="space-x-2 md:flex md:w-auto hidden items-center text-xs">
            <p className=" text-neutral-400 text-center">
              All Rights Reserved © 2023 TaskFlow |{" "}
            </p>
            <p className=" text-neutral-400 text-center">
              Developed by{" "}
              <span>
                <a
                  href="https://palamardev.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:underline-offset-2"
                >
                  Palamar.dev
                </a>
              </span>
            </p>
          </div>
        <div
          className="space-x-4 md:w-auto flex items-center
        justify-between w-full"
        >
          <Button size="sm" variant="ghost">Privacy Policy</Button>
          <Button size="sm" variant="ghost">Terms of Service</Button>          
        </div>
      </div>
    </div>
  );
};
