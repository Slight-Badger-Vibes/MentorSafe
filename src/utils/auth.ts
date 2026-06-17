import { SupabaseClient } from "@supabase/supabase-js";

export async function checkAuthAccess(
  supabase: SupabaseClient,
  path: string,
  user: any
) {
  if (path.startsWith("/mentor")) {
    if (!user) return { authorized: false, redirect: "/login/mentor" };
    const { data: mentor } = await supabase.from("Mentor").select("id").eq("email", user.email).single();
    if (!mentor) {
      await supabase.auth.signOut();
      return { authorized: false, redirect: "/login/mentor" };
    }
  }

  if (path.startsWith("/supervisor")) {
    if (!user) return { authorized: false, redirect: "/login/supervisor" };
    const { data: supervisor } = await supabase.from("Supervisor").select("id").eq("email", user.email).single();
    if (!supervisor) {
      await supabase.auth.signOut();
      return { authorized: false, redirect: "/login/supervisor" };
    }
  }

  return { authorized: true };
}
