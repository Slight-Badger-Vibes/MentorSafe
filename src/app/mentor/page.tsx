import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MentorDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login/mentor");
  }

  const mentor = await prisma.mentor.findUnique({
    where: { email: user.email! },
    include: {
      matches: {
        include: {
          youngPerson: true,
          parent: true,
        },
      },
    },
  });

  if (!mentor) {
    redirect("/login/mentor");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mentor Dashboard</h1>
      <div className="grid gap-4">
        {mentor.matches.map((match) => (
          <Link 
            key={match.id} 
            href={`/mentor/match/${match.id}`}
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="font-semibold">Young Person: {match.youngPerson.name}</h2>
            <p>Parent: {match.parent.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
