import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Loading from '../Loading/Loading';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);

  // Refs for navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  async function getAllCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {categories ? (
        <div className="relative">
          {/* Custom Prev Button */}
          <button
            ref={prevRef} // attach ref
            className="absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-slate-300 rounded-full p-2 shadow hover:bg-mainBg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-darkPrimary"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Swiper */}
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{}}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              960: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            onSwiper={(swiper) => {
              // Assign buttons after DOM renders
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {categories.map((category) => (
              <SwiperSlide
                key={category._id}
                className="bg-mainBg overflow-hidden"
              >
                <Link to={`/category/${category._id}`}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-72 object-cover"
                  />
                </Link>
                <h3 className="text-center bg-mainBg text-darkPrimary my-2 font-semibold">
                  {category.name}
                </h3>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Next Button */}
          <button
            ref={nextRef} // attach ref
            className="absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-slate-300 rounded-full p-2 shadow hover:bg-mainBg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-darkPrimary"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
