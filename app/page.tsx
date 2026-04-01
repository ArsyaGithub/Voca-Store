import UserLayout from "./(user)/layout"
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/api/product'
import FeaturedCarousel from "@/components/FeaturedCarousel"
import { getCategories } from '@/lib/api/category'
import { CategoryCard } from "@/components/CardCategory"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, LayoutGrid, ShoppingBag } from "lucide-react"

export default async function DashboardPage() {
  const categories = await getCategories()
  const products = await getProducts()

  return (
    <UserLayout>
      <div className="min-h-screen bg-slate-50/50">
        <section className="w-full bg-gradient-to-br from-teal-500 to-teal-700 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

              <div className="space-y-6 text-white order-2 md:order-1 text-center md:text-left">
                <div>
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">
                    Acer Nitro <span className="text-teal-200">Lite 16</span>
                  </h1>
                  <p className="text-teal-50 text-lg md:text-xl opacity-90 max-w-lg mx-auto md:mx-0">
                    Performance Gaming yang Terjangkau. Rasakan kecepatan tanpa batas dengan teknologi pendingin terbaru.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button className=" px-8 py-4 bg-white text-teal-700 font-bold rounded-2xl hover:bg-teal-50 transition-colors shadow-lg">
                    Beli Sekarang
                  </button>

                </div>
              </div>

              <div className="order-1 md:order-2 flex justify-center items-center">
                <div className="relative group animate-bounce-slow">
                  <div className="absolute inset-0 bg-teal-300 blur-[80px] opacity-20 rounded-full"></div>

                  <Image
                    src="/acer.png"
                    alt="Acer Nitro Lite 16"
                    width={500} // Ukuran diperbesar agar terlihat seperti hero product
                    height={500}
                    className="relative z-10 drop-shadow-2xl object-contain transform group-hover:scale-105 transition-transform duration-500"
                    priority // Menandakan gambar ini penting untuk dimuat cepat
                  />
                </div>
              </div>

            </div>
          </div>
        </section>


        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <Sparkles size={20} />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                Hot Produk
              </h2>
            </div>
            <div className="rounded-3xl shadow-2xl shadow-slate-200">
              <FeaturedCarousel products={products.slice(0, 8)} />
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-teal-600 font-bold uppercase tracking-wider text-xs">
                  <LayoutGrid size={14} />
                  <span>Kategori</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Jelajahi Kategori</h2>
              </div>

              <Link
                href="/category"
                className="group flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-all"
              >
                Lihat Semua
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-nowrap overflow-x-auto gap-4 md:gap-6 pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {categories.slice(0, 8).map((category) => (
                <CategoryCard
                  key={category.id}
                  icon_url={category.icon_url}
                  name={category.name}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-teal-600 font-bold uppercase tracking-wider text-xs">
                  <ShoppingBag size={14} />
                  <span>Untuk Anda</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Rekomendasi Produk</h2>
              </div>

              <Link
                href="/product"
                className="group flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-all"
              >
                Semua Produk
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {products.slice(0, 8).map((item) => (
                <div key={item.id} className="hover:-translate-y-1 transition-transform duration-300">
                  <ProductCard
                    id={item.id}
                    slug={item.slug}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                    stock={item.stock}
                    image={item.image_url}
                  />
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </UserLayout>
  )
}