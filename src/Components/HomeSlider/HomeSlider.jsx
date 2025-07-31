import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import homeSlider1 from '../../assets/photo-1487744480471-9ca1bca6fb7d.jpeg'
import homeSlider2 from '../../assets/product2-Cc8hawmZ.jpg'
import homeSlider3 from '../../assets/product3-CjkhanyU.jpg'
import homeSlider4 from '../../assets/product4-CxeAzYXu.jpg'
import homeSlider5 from '../../assets/product5-DZxbnV6L.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


export default function HomeSlider() {

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-12 md:col-span-12 lg:col-span-8'>
        <Swiper loop={true} className='h-[400px] md:h-full object-cover'>
            <SwiperSlide className=' relative'>
              <img src={homeSlider1} className=' h-full object-cover' />
              <div className="flex flex-col p-5 absolute top-0">
                <h2 className="text-3xl font-extrabold text-primary mb-2 Ubuntu"><span className="bg-white rounded-full text-darkPrimary px-3 py-2"><Link to={"/"}>
              <FontAwesomeIcon icon={faOpencart} className="text-primary" />
              <span> FreshCart</span>
            </Link></span></h2>
                <p className="text-sm text-white font-semibold max-w-xl mt-4 shadow-inner bg-slate-200/10 p-5 rounded-lg">Whether you’re looking for the freshest produce, pantry staples, or specialty items, FreshCart brings the supermarket to you, redefining the way you shop for groceries.</p>
                <div className="mt-8">
                  <a href="#products-section" className="btn capitalize rounded-full px-6">Get Started</a>
                </div>
              </div>

            </SwiperSlide>
            <SwiperSlide><img src={homeSlider2} className=' h-full object-cover' /></SwiperSlide>
            <SwiperSlide><img src={homeSlider3} className=' h-full object-cover' /></SwiperSlide>
        </Swiper>
      </div>
      <div className="grid grid-cols-12 col-span-12 md:col-span-12 lg:col-span-4">
        <div className="col-span-6 lg:col-span-12">
          <img src={homeSlider4} className="w-full h-full object-cover" />
        </div>
        <div className="col-span-6 lg:col-span-12">
          <img src={homeSlider5} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}
