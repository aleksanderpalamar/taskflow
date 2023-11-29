"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";

export const FormDelete = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="sm"
      className="bg-rose-500/10 text-rose-500 
      hover:bg-rose-500/20 hover:text-rose-500"
      aria-label="Delete"
      disabled={pending}
    >
      <Trash className="w-4 h-4" />
    </Button>
  );
};
