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
import { useToast } from "@/lib/hooks/use-toast"
import { toast } from "sonner"

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message)
            }

            toast.success("Berhasil", {
                description: "Akun berhasil dibuat",
            })

            router.push("/")
        } catch (err: any) {
            toast.error("Gagal", {
                description: err.message || "Terjadi kesalahan",
            })
        } finally {
            setLoading(false)
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
                        <h1 className="text-3xl font-bold">Register</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to register to your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <FieldGroup className="grid gap-4">
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input name="email" id="email" type="email" placeholder="m@example.com" required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input name="name" id="name" type="text" placeholder="John Doe" required />
                            </Field>
                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link href="#" className="text-sm underline">Forgot password?</Link>
                                </div>
                                <Input name="password" id="password" type="password" required />
                            </Field>
                            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                                Register
                            </Button>
                            <Button variant="outline" className="w-full">
                                Register with Google
                            </Button>
                        </FieldGroup>
                    </form>

                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/" className="underline">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
