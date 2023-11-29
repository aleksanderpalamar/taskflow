import { deleteBoard } from "@/actions/deleteBoard";
import { FormDelete } from "./form-delete";

interface BoardProps {
  id: string;
  title: string;
}

export const Board = ({ title, id }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id)

  return (
    <form action={deleteBoardWithId} className="flex items-center gap-x-2">
      <p>Board Title: {title}</p>
      <FormDelete />
    </form>
  );
};
