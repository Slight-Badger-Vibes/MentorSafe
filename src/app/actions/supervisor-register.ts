"use server";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function registerSupervisor(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const supabase = await createClient();

  // 1. Sign up user via Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // 2. Create Supervisor record in DB
  try {
    await prisma.supervisor.create({
      data: {
        email,
        name,
      },
    });
  } catch (dbError) {
    console.error("Failed to create supervisor record:", dbError);
    return { error: "Registration partially successful, but profile creation failed." };
  }

  redirect("/register/check-email");
}
