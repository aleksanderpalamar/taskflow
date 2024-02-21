"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { useParams } from "next/navigation";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams()
  const cardModal = useCardModal()
  const { 
    execute: executeCopyCard, 
    isLoading: isLoadingCopy } = useAction(copyCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied successfully 📋`)
        cardModal.onClose()
      },
      onError: (error) => {
        toast.error(error)
      }
    })
  const { 
    execute: executeDeleteCard, 
    isLoading: isLoadingDelete } = useAction(deleteCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted successfully 🗑️`)
        cardModal.onClose()
      },
      onError: (error) => {
        toast.error(error)
      }
    })

  const onCopy = () => {
    const boardId = params.boardId as string;
    executeCopyCard({
      id: data.id,
      boardId,
    })
  }

  const onDelete = () => {
    const boardId = params.boardId as string;
    executeDeleteCard({
      id: data.id,
      boardId,
    })
  }

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">
        Actions
      </p>
      <Button 
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray" 
        size="inline"
        className="w-full justify-start gap-2 text-emerald-500"
      >
        Copy
        <Copy className="w-4 h-4" />
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="rose"
        size="inline"
        className="w-full justify-start gap-2"
      >
        Delete
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  )
}

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  )
}