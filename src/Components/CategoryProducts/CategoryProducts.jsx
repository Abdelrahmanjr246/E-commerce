// src/Pages/CategoryProducts/CategoryProducts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import BackToTop from '../BackToTop/BackToTop';

import notFoundPhoto from '../../assets/no-product-found-DncxVh9z.png';
import GoBack from '../goBack/goBack';

export default function CategoryProducts({ categoryId }) {
  
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getProductsByCategory(id) {
        try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`);
        setProducts(data.data);
        } catch (error) {
            console.error("Error fetching products by category:", error);
        } finally {
            setLoading(false);
        }
    }

  useEffect(() => {
    if (categoryId) getProductsByCategory(categoryId);
  }, [categoryId]);

  if (loading) return <Loading/>;

  return (
    <>
        <BackToTop/>
        <main className="container mt-16 pt-[30px] pb-[20px] ">  
            <GoBack/>
        
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {products.length === 0 ? (
                <div className="col-span-full flex justify-center items-center">
                    <img
                    src={notFoundPhoto}
                    alt="No products found"
                    />
                </div>
                ) : (
                products.map((product) => (
                    <Card key={product._id} itemInfo={product} />
                ))
                )}
            </section>
        </main>
    </>
  );
}
