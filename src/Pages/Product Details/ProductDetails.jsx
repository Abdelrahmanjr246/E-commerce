import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { Heart } from 'lucide-react';
import 'swiper/css';
import Card from '../../Components/Card/Card';
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';
import { authContext } from '../../Context/AuthContext';
import LoginModal from '../../Components/LoginModel/LoginModel';
import GoBack from '../../Components/goBack/goBack';
import BackToTop from '../../Components/BackToTop/BackToTop';

export default function ProductDetails() {
  let { id } = useParams();

  const [productDetails, setProductDetails] = useState(null);
  const { token } = useContext(authContext);
  const [showLogin, setShowLogin] = useState(false);
  
  let {addProductToCart}=useContext(cartContext);
    let {addProductToWishlist, wishlist}=useContext(wishlistContext);
  
  const [related, setRelated] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  async function getProductDetails() {
    try{
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data);
      console.log(data.data);
      
      getRelatedProducts(data.data.category._id);
    }catch(err){
      console.log(err);
    }
  }



  async function getRelatedProducts(categoryId) {
    try{
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`);
      console.log(data.data);
      setRelated(data.data);
    }catch(err){
      console.log(err);
      
    }
  }

  useEffect(() => {
    getProductDetails();
     setActiveImageIndex(0); // Reset image index
    window.scrollTo({
      top: 0,
    });
  }, [id]);

  // Automatically switch active image every 2s
  useEffect(() => {
    if (!productDetails?.images) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) =>
        (prevIndex + 1) % productDetails.images.length
      );
    }, 4000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [productDetails?.images]);

  // Update active image on thumbnail click
  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  return productDetails ? (
    <>
      <BackToTop/>
      <div className="container pt-5 mt-16 rounded-lg overflow-hidden">
        <GoBack/>
        <div className="flex flex-col items-center md:flex-row">
          {/* Big Image */}
          <div className="md:w-1/3 p-4 relative flex flex-col items-center">
            <img
              src={productDetails.images[activeImageIndex]}
              alt={productDetails.title}
              className=" w-3/4 lg:w-full h-auto object-cover rounded-lg mb-2 transition-all duration-500"
            />



            {/* Thumbnails */}
            <div className="flex gap-2 mt-4">
              {productDetails.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${productDetails.title} thumbnail`}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-40 h-40 lg:h-30 object-cover rounded cursor-pointer border-2 ${
                    index === activeImageIndex
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-2/3 p-6 space-y-5 self-start">
            <h1 className="text-3xl font-bold text-darkPrimary mb-2">{productDetails.title}</h1>
            <h2 className="line-clamp-1 font-semibold my-1 text-primary">
              {productDetails.category.name}
            </h2>
            <div className="text-gray-500 text-sm">
              <span>{productDetails.brand.name}</span>
              <span className="mx-1">|</span>
              <span className="text-green-500">Available</span>

              <div className="rating flex gap-1 items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gold"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="gold"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <span className="text-darkPrimary">{productDetails.ratingsAverage}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{productDetails.description}</p>

            <div className="flex items-center mb-4">
              {productDetails.priceAfterDiscount?<div className="flex items-center gap-2">
                <span className="text-sm flex items-center line-through font-light text-slate-400">
                  <span>EGP {productDetails.price}</span>
                </span>
                
                <span className="text-lg font-semibold flex items-center text-primary">
                  <span>EGP {productDetails.priceAfterDiscount}</span>
                </span>
              </div>:
              <span className="text-xl font-semibold text-primary">
                EGP {productDetails.price}
              </span>}
              
              
            </div>

            <div className="flex space-x-3">
              <button onClick={() => {if (!token) return setShowLogin(true);addProductToWishlist(productDetails.id)}} className="btn py-2 px-4">
                {
                  wishlist?.data?.some((item) => item.id === productDetails.id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="size-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  )
                }
              </button>
              <button 
                onClick={() => {
                  if (!token) return setShowLogin(true);
                  addProductToCart(productDetails.id)}
                } className="btn font-bold py-2 px-4 grow flex justify-center items-center gap-1">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
          <h2 
          className="text-sky-950 p-2 relative text-3xl after:w-1/2 after:h-[3px] after:-translate-x-1/2 after:bg-primary after:absolute after:left-1/2 after:top-full font-bold text-center my-12">
            Related products
          </h2>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {related?.map((item) => (
          <Card itemInfo={item} key={item.id} />
        ))}
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}


    </>
  ) : (
    <Loading />
  );
}
