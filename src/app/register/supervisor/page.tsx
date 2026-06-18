import { registerSupervisor } from "@/app/actions/supervisor-register";

export default function SupervisorRegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50">
      <form action={registerSupervisor} className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold">Supervisor Registration</h1>
        <input name="name" placeholder="Full Name" required className="p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" required className="p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required className="p-2 border rounded" />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">Register</button>
      </form>
    </div>
  );
}
