"use server"

import { addProduct } from "@/lib/api/product"
import { revalidatePath } from "next/cache"
import { getErrorMessage } from "@/lib/utils"

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
    return { message: getErrorMessage(error, "Failed to create product.") }
  }
}