"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface FormButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "link"
    | "ghost"
    | "primary"
    | "secondary";
}

export const FormSubmit = ({
  children,
  className,
  disabled,
  variant = "default",
}: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={disabled || pending}
      className={cn(className)}
      variant={variant}
      type="submit"
      size="sm"
    >
      {children}
    </Button>
  );
};
