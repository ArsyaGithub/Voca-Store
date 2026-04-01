"use server"

import { revalidatePath } from "next/cache"
import { updateProduct, deleteProduct } from "@/lib/api/product"

export async function editProductAction(id: number, formData: FormData) {
  try {
    await updateProduct(id, formData)

    revalidatePath("/control")
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message ?? "Gagal update produk",
    }
  }
}

export async function deleteProductAction(id: number) {
  try {
    await deleteProduct(id)

    revalidatePath("/control")
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message ?? "Gagal hapus produk",
    }
  }
}