"use server"

import { addProduct } from "@/lib/api/product"
import { revalidatePath } from "next/cache"

interface FormState {
    message: string;
}

export async function createProduct(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  try {
    await addProduct(formData)

    revalidatePath("/control")
    return { message: "success" }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as any
      if (axiosError.response?.data?.message) {
        return { message: axiosError.response.data.message }
      }
    }

    return { message: "Failed to create product." }
  }
}