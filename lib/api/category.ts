import api from "../axios"
import { handleApiError } from "../utils"
import { Category, CategoryWithProducts } from "@/types/category"
import { getAuthHeaders } from "../auth-server"

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await api.get<{ data: { entries: Category[] } }>("/category")
    return response.data?.data?.entries || []
  } catch (error: unknown) {
    handleApiError(error)
    return[]
  }
}

export async function getCategoryBySlug(slug: string): Promise<CategoryWithProducts | undefined> {
  try {
    const response = await api.get<{ data: CategoryWithProducts }>(`/category/${slug}`)
    return response.data?.data
  } catch (error: unknown) {
    handleApiError(error)
  }
}

export async function addCategory(data: { name: string; icon: File }) {
  const headers = await getAuthHeaders()

  const formData = new FormData()
  formData.append("name", data.name)
  formData.append("icon", data.icon)

  try {
    const response = await api.post<{ data: Category }>(
      "/api/admin/category",
      formData,
      {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      }
    )

    return response.data?.data
  } catch (error: unknown) {
    handleApiError(error)
  }
}

export async function deleteCategory(id : number) {
  const headers = await getAuthHeaders()
  try {
    const response = await api.delete<{ data: Category }>(`/api/admin/category/${id}`, { headers })
    return response.data?.data
  } catch (error: unknown) {
    handleApiError(error)
  }
}

export async function editCategory(id: number, payload: Pick<Category, "name">) {
  const headers = await getAuthHeaders()
  try {
    const response = await api.put<{ data: Category }>(`/api/admin/category/${id}`, payload, { headers })
    return response.data?.data
  } catch (error: unknown) {
    handleApiError(error)
  }
}