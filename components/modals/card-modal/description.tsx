"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { AlignLeft } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormTextArea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";

interface DescriptionProps {
  data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      })
      toast.success(`Card "${data.title}" updated! 🎉`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    execute({
      id: data.id,
      description,
      boardId,
    })
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="w-6 h-6 mt-0.mx-5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form
            action={onSubmit}
            ref={formRef}
            className="space-y-2"
          >
            <FormTextArea 
              id="description"
              className="w-full mt-2"
              placeholder="Add a more detailed description..."
              defaultValue={data.description || undefined}
              errors={fieldErrors}
              ref={textareaRef}
            />
            <div className="flex items-center gap-x-2 justify-end">
              <FormSubmit 
                className="bg-violet-500 hover:bg-violet-600 text-white"
              >
                Save
              </FormSubmit>
              <Button type="button" variant="ghost" size="sm" onClick={disableEditing}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] w-full p-3 rounded-md bg-neutral-200 
            text-neutral-600 text-sm leading-relaxed cursor-pointer 
            font-medium py-3 px-3.5"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-center gap-x-3 w-full">
      <Skeleton className="w-6 h-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};
