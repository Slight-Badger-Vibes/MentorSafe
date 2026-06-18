import { prisma } from "../lib/prisma";
import { MentorId } from "../domain/types";

export const createProgram = async (name: string) => {
  try {
    const program = await prisma.program.create({ data: { name } });
    return { data: program };
  } catch (error) {
    return { error: "Failed to create program" };
  }
};

export const getProgramsByMentor = async (mentorId: MentorId) => {
  try {
    const mentorPrograms = await prisma.mentorProgram.findMany({
      where: { mentorId },
      include: { program: true },
    });
    return { data: mentorPrograms.map((mp) => mp.program) };
  } catch (error) {
    return { error: "Failed to fetch programs" };
  }
};
