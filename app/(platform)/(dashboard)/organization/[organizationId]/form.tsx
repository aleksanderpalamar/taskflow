"use client";

import { create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { useFormState} from "react-dom";
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";

export const Form = () => {
  const initialState = { message: null, errors: {} } 
  const [state, dispatch] = useFormState(create, initialState)

  return (
    <form action={dispatch} className="flex items-center gap-x-2">
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors}/>                    
      </div>
      <FormButton />
    </form>
  );
};
