import { PrismaClient } from "@prisma/client";
import { 
  createMentor, 
  createParent, 
  createYoungPerson, 
  createMatch 
} from "../actions/supervisor";
import { MatchActionButtons } from "./MatchActionButtons";

const prisma = new PrismaClient();

export default async function SupervisorDashboard() {
  const mentors = await prisma.mentor.findMany();
  const parents = await prisma.parent.findMany();
  const youngPeople = await prisma.youngPerson.findMany();
  const matches = await prisma.match.findMany({
    include: {
      mentor: true,
      parent: true,
      youngPerson: true,
    },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Supervisor Dashboard</h1>
        <p className="text-slate-500">Manage mentors, parents, and mentoring matches.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mentors Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Mentors</h2>
          <form action={createMentor} className="space-y-2 border p-4 rounded-lg bg-slate-50">
            <input name="name" placeholder="Name" className="w-full p-2 border rounded" required />
            <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" required />
            <input name="phoneNumber" placeholder="Phone (e.g. +44...)" className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700">Add Mentor</button>
          </form>
          <ul className="divide-y border rounded-lg">
            {mentors.map(m => (
              <li key={m.id} className="p-3 text-sm flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-slate-500">{m.phoneNumber}</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">{m.email}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* Parents Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Parents</h2>
          <form action={createParent} className="space-y-2 border p-4 rounded-lg bg-slate-50">
            <input name="name" placeholder="Name" className="w-full p-2 border rounded" required />
            <input name="phoneNumber" placeholder="Phone (e.g. +44...)" className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700">Add Parent</button>
          </form>
          <ul className="divide-y border rounded-lg">
            {parents.map(p => (
              <li key={p.id} className="p-3 text-sm flex justify-between">
                <span className="font-medium">{p.name}</span>
                <span className="text-slate-500">{p.phoneNumber}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Young People Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Young People</h2>
          <form action={createYoungPerson} className="space-y-2 border p-4 rounded-lg bg-slate-50">
            <input name="name" placeholder="Name" className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700">Add YP</button>
          </form>
          <ul className="divide-y border rounded-lg">
            {youngPeople.map(y => (
              <li key={y.id} className="p-3 text-sm">
                <span className="font-medium">{y.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Matches Section */}
      <section className="space-y-4 border-t pt-8">
        <h2 className="text-2xl font-bold">Matches (Anonymous Bridges)</h2>
        <form action={createMatch} className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-6 rounded-lg bg-slate-50">
          <select name="mentorId" className="p-2 border rounded bg-white" required>
            <option value="">Select Mentor</option>
            {mentors.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <select name="parentId" className="p-2 border rounded bg-white" required>
            <option value="">Select Parent</option>
            {parents.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select name="youngPersonId" className="p-2 border rounded bg-white" required>
            <option value="">Select YP</option>
            {youngPeople.map(y => <option key={y.id} value={y.id}>{y.name}</option>)}
          </select>
          <input name="proxyNumber" placeholder="Proxy Number (+44...)" className="p-2 border rounded" required />
          <button type="submit" className="md:col-span-4 bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700">Create Match & Activate Bridge</button>
        </form>

        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 font-semibold">Mentor</th>
                <th className="p-4 font-semibold">Parent</th>
                <th className="p-4 font-semibold">Young Person</th>
                <th className="p-4 font-semibold">Proxy Number</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {matches.map(m => (
                <tr key={m.id}>
                  <td className="p-4 font-medium">{m.mentor.name}</td>
                  <td className="p-4">{m.parent.name}</td>
                  <td className="p-4 italic">{m.youngPerson.name}</td>
                  <td className="p-4 font-mono text-blue-600">{m.proxyNumber}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                      m.status === 'Active' ? 'bg-green-100 text-green-800' :
                      m.status === 'Suspended' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <MatchActionButtons matchId={m.id} currentStatus={m.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {matches.length === 0 && <p className="p-8 text-center text-slate-500">No active matches found. Create one above to start mentoring.</p>}
        </div>
      </section>
    </div>
  );
}
