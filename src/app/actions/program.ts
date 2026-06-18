"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setActiveProgram(programId: string) {
  const cookieStore = await cookies();
  cookieStore.set("activeProgramId", programId);
  redirect("/mentor");
}
