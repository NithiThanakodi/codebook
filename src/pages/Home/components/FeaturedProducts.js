import { ProductCard } from "../../../components/";
import { useState, useEffect } from "react";
import { getFeaturedist } from "../../../services";
import { toast } from "react-toastify";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getFeaturedist();
        setProducts(data);
      }
      catch (error) {
        toast.error(error.message, { closeButton: true, autoClose: 5000, position: "bottom-center" });
      }
    }
    fetchProduct();
  }, [])

  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured eBooks</h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
