// lib/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query"
import { login } from "@/lib/auth/login"

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await login(email, password)
      return response // Return data dari backend
    },
  })
}