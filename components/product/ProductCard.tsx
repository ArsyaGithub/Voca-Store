"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, Loader2, Tag } from 'lucide-react' // Tambah ikon Tag
import { useCart } from '@/context/CartContext'
import { notifyError } from '@/lib/toast'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { formatRupiah } from '@/lib/utils'
interface ProductCardProps {
    id: number;
    slug: string;
    name: string;
    category: { id: number, name: string } | string;
    price: number;
    stock: number;
    image: string;
}

export default function ProductCard({ id, slug, name, category, price, stock, image }: ProductCardProps) {
    const { addToCart } = useCart()
    const [isLoading, setIsLoading] = useState(false)

    async function handleAdd() {
        setIsLoading(true)
        try {
            await addToCart(id, 1) // qty default 1
        } catch (err) {
            console.error("Gagal menambahkan ke keranjang:", err)
            notifyError("Gagal menambahkan ke keranjang")
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Card className='group overflow-hidden border-none shadow-md transition-all hover:shadow-xl bg-white'>
            <Link href={`/product/${slug}`} className="block">
                <div className='relative aspect-4/3 w-full overflow-hidden bg-white p-4'>
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className='object-contain transition-transform duration-300 hover:scale-110'
                        sizes='(max-width: 786px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                </div>

                <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-1 text-xs font-medium text-teal-600 uppercase tracking-wider">
                        <Tag className="w-3 h-3" />
                        {typeof category === "string"
                            ? category
                            : category?.name ?? "Tanpa Kategori"}
                    </div>

                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-lg line-clamp-1 text-gray-800">{name}</h3>
                        <Badge variant={stock > 0 ? "outline" : "destructive"} className="text-[10px] shrink-0">
                            <Package className="w-3 h-3 mr-1" /> {stock > 0 ? `Stok: ${stock}` : "Habis"}
                        </Badge>
                    </div>

                    <p className="text-xl font-extrabold text-teal-600">
                        {formatRupiah(price)}
                    </p>
                </CardContent>
            </Link>

            <CardFooter className="p-4 pt-0">
                <Button
                    disabled={stock === 0 || isLoading}
                    onClick={handleAdd}
                    className="w-full bg-teal-600 hover:bg-teal-700 gap-2 transition-colors"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <ShoppingCart className="w-4 h-4" />
                    )}
                    {isLoading ? "Menambahkan..." : stock > 0 ? "Tambah ke Keranjang" : "Stok Kosong"}
                </Button>
            </CardFooter>
        </Card>
    )
}