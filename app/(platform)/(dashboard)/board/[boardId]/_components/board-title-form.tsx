"use client";

import { Board } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { updateBoard } from "@/actions/update-board";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title); // TODO: Implement this state to store the title [DONE]
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    // TODO: Implement this function to enable editing
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const handleOnSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    
    execute({
      title,
      id: data.id,
    })
  }

  const handleOnBlur = () => {
    formRef.current?.requestSubmit();
  }

  if (isEditing) {
    return (
      <form action={handleOnSubmit} ref={formRef} className="flex items-center gap-x-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={handleOnBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 bg-transparent
          focus-visible:outline-none focus-visible:ring-transparent
          border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg w-auto h-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};
