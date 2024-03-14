"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Check } from "lucide-react";
//import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const ProModal = () => {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/*<div className="aspect-video relative flex
      items-center justify-center">
        <Image 
          src=""
          alt=""
          className="object-cover"
          fill
        />       
      </div>*/}
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">Upgrade to Taskflow Pro</h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Taskflow with the premium version.
          </p>
          <div className="pl-3">
            <ul className="text-sm list-none">
              <li className="flex items-center mr-2">
                <Check className="text-emerald-500 w-4 h-4" />
                <span>Unlimited boards</span>
              </li>
              <li className="flex items-center mr-2">
                <Check className="text-emerald-500 w-4 h-4" />
                <span>Advanced checklist</span>
              </li>
              <li className="flex items-center mr-2">
                <Check className="text-emerald-500 w-4 h-4" />
                <span>Admin and security features</span>
              </li>
              <li className="flex items-center mr-2">
                <Check className="text-emerald-500 w-4 h-4" />
                <span>And more!</span>
              </li>
            </ul>
          </div>
          <Button
            onClick={onClick}
            disabled={isLoading}
            className="w-full"
            variant="primary"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
