"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from '@/types/product';
export default function FeaturedCarousel({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const displayProducts = [...products, ...products];

  const handleInfiniteScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const half = el.scrollWidth / 2;

    if (el.scrollLeft >= half) {
      el.scrollLeft -= half;
    }

    if (el.scrollLeft <= 0) {
      el.scrollLeft += half;
    }
  };

  // 🔥 tombol scroll manual
  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.8;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollLeft = el.scrollWidth / 2;
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      el.scrollBy({
        left: el.clientWidth * 0.8,
        behavior: "smooth",
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* tombol kiri */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 border opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* tombol kanan */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 border opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* carousel */}
      <div
        ref={scrollRef}
        onScroll={handleInfiniteScroll}
        className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth"
      >
        {displayProducts.map((item: Product, index: number) => (
          <div
            key={`${item.id}-${index}`}
            className="flex-none w-[280px] sm:w-[320px]"
          >
            <ProductCard {...item} image={item.image_url} />
          </div>
        ))}
      </div>
    </div>
  );
}
