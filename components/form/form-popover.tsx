"use client";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { CreateBoard } from "@/actions/create-board";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { ElementRef, ReactNode, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
  children: ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const proModal = useProModal();
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute, fieldErrors } = useAction(CreateBoard, {
    onSuccess: (data) => {;      
      toast.success("Board created");
      closeRef.current?.click();
      router.push(`/board/${data.id}`)
    },
    onError: (error) => {;      
      toast.error(error);
      proModal.onOpen();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("Title") as string;
    const image = formData.get("Image") as string;

    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-zinc-600">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-zinc-600"
            variant="ghost"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="Image" errors={fieldErrors} />
            <FormInput
              id="Title"
              label="Board Title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit
            className="w-full bg-violet-500/10 
          text-violet-500 hover:bg-violet-500/20 transition"
          >
            Create
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
