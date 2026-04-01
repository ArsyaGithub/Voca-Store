"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

// Helper: validasi redirect URL hanya path internal
function isValidRedirect(url: string): boolean {
    // Hanya terima path relatif (mulai /, tanpa //)
    return url.startsWith("/") && !url.startsWith("//")
}

export function     LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsPending(true)

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || "Login gagal")
                return
            }

            const user = data.data.user

            // Validasi redirect URL (lindungi dari open redirect)
            const next = searchParams.get("next")
            if (next && isValidRedirect(next)) {
                router.push(next)
                return
            }

            if (user.role === "Admin") {
                router.push("/control")
                return
            }

            router.push("/")
        } catch {
            setError("Terjadi kesalahan jaringan")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className={cn("grid w-full lg:grid-cols-2", className)} {...props}>

            <div className="hidden lg:flex lg:items-center lg:justify-center bg-muted relative min-h-150 p-12 rounded-r-3xl overflow-hidden">
                <Image
                    src="/loginimage.avif"
                    alt="Login Background"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="relative z-10 w-full max-w-xs rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md min-h-100 flex flex-col">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white text-center">Voca Store Here</h3>
                        <p className="text-lg text-slate-200 leading-relaxed text-center">
                            E-commerce Nomor 1 di Jagat Sawit yang sudah dipercaya oleh Prabowo Subianto.
                        </p>
                    </div>

                    <div className="mt-auto pt-4">
                        <p className="text-lg font-medium text-white leading-relaxed">
                            Moto Kami : <span className="italic text-white">Nyawit Nomor 1</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <FieldGroup className="grid gap-4">
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link href="#" className="text-sm underline">Forgot password?</Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                            </Field>
                            <Button type="submit" disabled={isPending} className="w-full bg-teal-600 hover:bg-teal-700">
                                {isPending ? "Logging in..." : "Login"}
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </FieldGroup>
                    </form>

                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="underline">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}