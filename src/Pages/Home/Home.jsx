import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card'
import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
import HomeSlider from '../../Components/HomeSlider/HomeSlider'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import BackToTop from '../../Components/BackToTop/BackToTop'

export default function Home() {


  const [products, setProducts] = useState(null)

  async function getAllProducts() {

    const options = {
      method: 'GET',
      url:'https://ecommerce.routemisr.com/api/v1/products',

    }


    let {data} = await axios.request(options)
    setProducts(data.data)
  }
  


  useEffect(() =>{
    getAllProducts()
  },[])

  return (
    <>
    
    <BackToTop/>

    <div className='mt-16 py-7 space-y-7'>

      {/* HOME SLIDER */}

      <HomeSlider/>

      {/* CATEGORY SLIDER */}
      <h2 class="font-semibold text-lg -mt-3 mb-2 text-darkPrimary">Shope now by popular categories</h2>
      <CategorySlider/>


      {/* PRODUCTS  */}

      <div id="products-section">
        <div className="flex justify-center">
          <h2 
            className="text-sky-950 p-2 relative text-3xl after:w-1/2 after:h-[3px] after:-translate-x-1/2 after:bg-primary after:absolute after:left-1/2 after:top-full font-bold text-center my-12">Shope now by popular products</h2>
        </div>
      </div>


      {products ? 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {products.slice(0, 12).map((item) => <Card itemInfo={item} key={item.id}/>)}
        </div> :
        <Loading/>
      }


    </div>
    </>
  )
}
