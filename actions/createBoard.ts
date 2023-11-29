"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    title?: string[];
  },
  message?: string | null;
}

const createBoardSchema = z.object({
  title: z.string().min(3, { message: "Minimun length of 3 letters is required" }),
});

export async function create(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = createBoardSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields",
    };
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: "Database error",
    };
  }

  revalidatePath("/organization/org_2YRzLCaLGEPH0MuouImh2K6IbkD");
  redirect("/organization/org_2YRzLCaLGEPH0MuouImh2K6IbkD")
}
