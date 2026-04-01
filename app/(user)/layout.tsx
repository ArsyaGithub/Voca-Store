import { getUser } from "@/lib/api/user"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CartProvider } from "@/context/CartContext"

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header user={user} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  )
}