"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Pencil, Loader2, MapPin, Phone, User, Home, Building, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/lib/hooks/use-toast"
import { updateAddress, getAddresses } from "@/lib/api/user"
import { AddressData } from "@/types/auth"
import { Checkbox } from "@/components/ui/checkbox"

const addressSchema = z.object({
    label: z.string().min(2, "Label minimal 2 karakter (contoh: Rumah, Kantor)"),
    recipient_name: z.string().min(2, "Nama penerima minimal 2 karakter"),
    phone: z.string().min(10, "Nomor HP minimal 10 karakter"),
    address_line: z.string().min(5, "Alamat lengkap minimal 5 karakter"),
    city: z.string().min(2, "Kota minimal 2 karakter"),
    province: z.string().min(2, "Provinsi minimal 2 karakter"),
    postal_code: z.string().min(5, "Kode pos minimal 5 karakter"),
    is_primary: z.boolean(),
})

type AddressFormValues = z.infer<typeof addressSchema>

interface EditAddresProps {
    address: AddressData
    onSuccess?: () => void
}

export default function EditAddres({ address, onSuccess }: EditAddresProps) {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const form = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            label: address.label,
            recipient_name: address.recipient_name,
            phone: address.phone,
            address_line: address.address_line,
            city: address.city,
            province: address.province,
            postal_code: address.postal_code,
            is_primary: address.is_primary,
        },
    })

    async function onSubmit(values: AddressFormValues) {
        setIsSubmitting(true)
        try {
            // Jika memilih sebagai primary dan sebelumnya bukan primary
            if (values.is_primary && !address.is_primary) {
                const existingAddresses = await getAddresses()
                const currentPrimary = existingAddresses.find(addr => addr.is_primary)
                if (currentPrimary) {
                    await updateAddress(currentPrimary.uid, { is_primary: false })
                }
            }

            await updateAddress(address.uid, values)
            toast({
                title: "Alamat diperbarui",
                description: "Perubahan alamat berhasil disimpan.",
            })
            setOpen(false)
            if (onSuccess) onSuccess()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Gagal",
                description: "Terjadi kesalahan saat memperbarui alamat.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="text-gray-400 hover:text-teal-600 transition-colors">
                    <Pencil size={16} />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-teal-900 flex items-center gap-2">
                        <Pencil className="text-teal-600" size={20} /> Edit Alamat
                    </DialogTitle>
                    <DialogDescription>
                        Perbarui detail alamat pengiriman Anda di bawah ini.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Home size={14} /> Label Alamat
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Rumah / Kantor" {...field} className="focus-visible:ring-teal-600" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="recipient_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <User size={14} /> Nama Penerima
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nama Lengkap" {...field} className="focus-visible:ring-teal-600" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Phone size={14} /> Nomor HP Penerima
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="08xxxxxxxxxx" {...field} className="focus-visible:ring-teal-600" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address_line"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <MapPin size={14} /> Alamat Lengkap
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Jl. Nama Jalan, No. Rumah, RT/RW"
                                            {...field}
                                            className="focus-visible:ring-teal-600"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Building size={14} /> Kota
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Kota / Kabupaten" {...field} className="focus-visible:ring-teal-600" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="province"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <MapPin size={14} /> Provinsi
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Provinsi" {...field} className="focus-visible:ring-teal-600" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="postal_code"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel className="flex items-center gap-2">
                                        <Hash size={14} /> Kode Pos
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="12345" {...field} className="focus-visible:ring-teal-600" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_primary"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border p-4 shadow-sm bg-gray-50/50">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="mt-1"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="font-semibold text-teal-900">
                                            Jadikan Alamat Utama
                                        </FormLabel>
                                        <p className="text-sm text-gray-500">
                                            Alamat ini akan digunakan secara default untuk setiap pesanan Anda.
                                        </p>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="rounded-xl"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-teal-600 hover:bg-teal-700 rounded-xl px-8"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    "Simpan Perubahan"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
