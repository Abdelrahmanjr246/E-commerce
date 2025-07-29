import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryStockMap, setCategoryStockMap] = useState({});
  const [loading , setLoading] = useState(false)

  // Step 1: Get all categories
  async function getAllCategories() {
    setLoading(true)
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(data.data);

      // Step 2: For each category, check if it has products
      const stockInfo = await Promise.all(
        data.data.map(async (category) => {
          const res = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/products?category[in]=${category._id}`
          );
          return { categoryId: category._id, hasProducts: res.data.data.length > 0 };
        })
      );

      // Convert to map: { "id1": true, "id2": false }
      const stockMap = {};
      stockInfo.forEach(({ categoryId, hasProducts }) => {
        stockMap[categoryId] = hasProducts;
      });

      setCategoryStockMap(stockMap);

      setLoading(false)
    } catch (error) {
      console.error("Error fetching categories or stock:", error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <main className="container pt-[30px] pb-[30px] mt-16">
      <h2 className="text-center border-b border-t border-slate-200 py-2 text-primary text-lg">
        Shop by category
      </h2>

      {loading?<Loading/>:<section className="wrapper grid grid-cols-12 px-2 pb-4">
        {categories.map((category) => {
          const isOutOfStock = categoryStockMap[category._id] === false;

          return (
            <article
              key={category._id}
              className="flex flex-col justify-center items-center p-4 max-xs:col-span-6 col-span-4 md:col-span-3 lg:md:col-span-2"
            >
              <Link
                className="relative group inline-block mb-6 size-[150px] rounded-xl shadow-md cursor-pointer p-1"
                to={`/category/${category._id}`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="size-full object-cover rounded-xl group-hover:scale-[1.03] duration-500"
                />
                <h2 className="mt-3 font-semibold text-center text-darkPrimary">
                  {category.name}
                </h2>

                {/* Show this only if no products */}
                {isOutOfStock && (
                  <p className="bg-red-600/50 text-sm w-[95%] text-white uppercase text-center absolute top-1/2 -translate-y-1/2">
                    Out OF STOCK
                  </p>
                )}
              </Link>
            </article>
          );
        })}
      </section>}
    </main>
  );
}
