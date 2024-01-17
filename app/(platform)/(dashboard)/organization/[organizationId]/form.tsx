"use client";

import { CreateBoard } from "@/actions/create-board"


import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

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
        <FormInput
          label="Board Title"
          errors={fieldErrors}
          id="title"
        />
      </div>
      <FormSubmit>
        Save
      </FormSubmit>
    </form>
  );
};
