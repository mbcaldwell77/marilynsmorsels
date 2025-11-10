import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import Link from "next/link";

export default function BestSellers() {
  // Show the 6-pack chocolate chip, 12-pack half & half, and 12-pack butterscotch
  const featured = [
    products.find((p) => p.id === "cc-6"),
    products.find((p) => p.id === "hh-12"),
    products.find((p) => p.id === "bc-12"),
  ].filter(Boolean) as typeof products;

  const tags = ["Best-seller", "Marilyn's Favorite", "Rising Star"];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-morselCocoa mb-4">
            Best-sellers
          </h2>
          <p className="text-morselBrown/70 text-lg max-w-2xl mx-auto">
            These are the hits. Start here.
          </p>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-10">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} tag={tags[index]} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/shop"
            className="inline-block px-8 py-4 bg-morselCocoa text-white text-base font-semibold rounded-full shadow-button hover:shadow-button-hover hover:scale-[1.02] transition-all duration-200"
          >
            View All Cookies
          </Link>
        </div>
      </div>
    </section>
  );
}

