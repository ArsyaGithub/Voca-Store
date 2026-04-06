"use client"
import { useEffect, useState } from 'react'
import { CommandDemo } from '@/components/shared/Command'
import { User } from '@/types/auth'
import { CartSheet } from "@/components/cart/CartSheet"
import { UserItem } from './UserItem'
import Link from 'next/link'
import { clientApi } from '@/lib/client-api'
import { Product } from '@/types/product'
import NotificationBell from './Notification'

function Header({ user }: { user?: User }) {
    const [products, setProducts] = useState<Product[]>([])
     const isAuthenticated = Boolean(user)

    useEffect(() => {
        clientApi.get<{ data: { entries: Product[] } }>("/products")
            .then(res => {
                const entries = res.data?.entries ?? []
                setProducts(entries)
            })
            .catch(err => {
                console.error("Gagal fetch products untuk search:", err)
            })
    }, [])


    return (
        <div className="flex justify-between p-3  bg-white">
            <div className='flex items-center gap-4'>
                <div className='font-bold text-xl text-teal-400'>
                    <Link href="/">
                        Voca
                    </Link>
                </div>
            </div>

            <CommandDemo products={products} />
            <div className='flex items-center gap-4'>
                {isAuthenticated ? (
                    <>
                        <NotificationBell />
                        <CartSheet />
                        <UserItem />
                    </>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link
                            href="/login"
                            className="rounded-md bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-teal-700"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-slate-50"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header

