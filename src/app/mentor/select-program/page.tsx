import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getProgramsByMentor } from "@/services/program";
import { MentorId } from "@/domain/types";
import { setActiveProgram } from "../actions/program";

export default async function SelectProgramPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login/mentor");

  const mentor = await prisma.mentor.findUnique({ where: { email: user.email! } });
  if (!mentor) redirect("/login/mentor");

  const { data: programs, error } = await getProgramsByMentor(mentor.id as MentorId);

  if (error || !programs || programs.length === 0) {
    return <div className="p-4">No programs found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select Program</h1>
      <div className="grid gap-4">
        {programs.map((program) => (
          <form key={program.id} action={setActiveProgram.bind(null, program.id)}>
            <button
              type="submit"
              className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left"
            >
              {program.name}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
