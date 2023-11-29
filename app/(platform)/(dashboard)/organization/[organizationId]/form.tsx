"use client";

import { CreateBoard } from "@/actions/create-board"
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";
import { useAction } from "@/hooks/use-action";

export const Form = () => {
  const { execute, fieldErrors } = useAction(CreateBoard, {
    onSuccess: (data) => {
    console.log(data, "SUCCESS👍");
    },
    onError: (error) => {
      console.error(error);
    }
  });
  
  const handleOnSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  }

  return (
    <form action={handleOnSubmit} className="flex items-center gap-x-2">
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors}/>                    
      </div>
      <FormButton />
    </form>
  );
};
