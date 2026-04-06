import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-teal-400 p-4 md:p-10">
      <div className="w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <LoginForm />
      </div>
    </div>
  )
}

