export default function CheckEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Please check your email</h1>
      <p className="text-zinc-600">
        We've sent a confirmation link to your email address. 
        Please click the link to confirm your registration before logging in.
      </p>
    </div>
  );
}
