import { getUser } from "@/lib/api/user"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
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
