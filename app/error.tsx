"use client";

import { Button } from "@/components/ui/button";

export type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div
      role="alert"
      className="flex flex-col gap-4 items-center justify-center h-screen bg-slate-100 dark:bg-slate-900 p-40"
    >
      <p className="text-2xl font-bold antialiased">Something went wrong:</p>
      <span className="text-rose-500 antialiased">
        <span className="font-bold mr-2">{error.name}:</span>
        {error.message}
      </span>
      
      <div className="space-x-4 flex items-center">
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
