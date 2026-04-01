// components/admin/GenericDelete.tsx
"use client"
import { useState } from "react"
import type { ReactNode } from "react"
import { Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger } from "@/components/ui/alert-dialog" // Import shadcn alert

interface GenericDeleteProps {
  id: string | number;
  name: string;
  entityName: string;
  onDelete: (id: any) => Promise<void>; // Fungsi API-nya
  trigger?: ReactNode;
}

export function GenericDelete({ id, name, entityName, onDelete, trigger }: GenericDeleteProps) {
  const [loading, setLoading] = useState(false)

  const handleAction = async () => {
    try {
      setLoading(true)
      await onDelete(id)
      // Tambahkan toast sukses di sini
    } catch (err) {
      // Handle error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="icon" className="text-red-500"><Trash2 size={14}/></Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus {entityName}?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus <strong>{name}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction} disabled={loading} className="bg-red-600">
            {loading ? <Loader2 className="animate-spin" /> : "Ya, Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}