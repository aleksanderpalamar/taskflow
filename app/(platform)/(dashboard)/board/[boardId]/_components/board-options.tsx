"use client";

import { Button } from "@/components/ui/button";
import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { MoreHorizontal, Trash, X } from "lucide-react";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    }
  });

  const handleOnDelete = () => {
    execute({ id })
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="transparent"
          className="w-auto h-auto p-2"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600
        pb-4">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button 
            variant="ghost"
            className="w-auto h-auto p-2 absolute top-2 right-2 text-zinc-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button 
          variant="ghost"
          className="w-full h-auto p-2 px-5 justify-start
          font-normal text-sm rounded-none"
          onClick={handleOnDelete}
          disabled={isLoading}
        >
          <Trash className="w-4 h-4 mr-2 text-rose-500" />
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
