import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create a Mentor
  const mentor = await prisma.mentor.upsert({
    where: { email: 'mentor@test.com' },
    update: {},
    create: {
      name: 'Test Mentor',
      email: 'mentor@test.com',
      phoneNumber: '07700900001',
    },
  })
  console.log('Created mentor:', mentor)

  // Create a Supervisor
  const supervisor = await prisma.supervisor.upsert({
    where: { email: 'supervisor@test.com' },
    update: {},
    create: {
      name: 'Test Supervisor',
      email: 'supervisor@test.com',
    },
  })
  console.log('Created supervisor:', supervisor)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
