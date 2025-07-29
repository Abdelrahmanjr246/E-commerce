import axios from 'axios'
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { useEffect, useState } from 'react';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading , setLoading] = useState(false)
  const [pagination, setPagination] = useState(null)
  
  async function getAllBrands(page=1) {
    setLoading(true)
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${page}`);
      setBrands(data.data);
      setLoading(false)
      setPagination(data.metadata)

    } catch (error) {
      console.error("Error fetching categories or stock:", error);
    }
  }

  function handelPageChange(index){
    getAllBrands(index)
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <main className="container mt-16 pt-[30px] pb-[30px]">
  <h2 className="text-center border-b border-t border-slate-200 py-2 text-primary text-lg">
    Shop by Brand
  </h2>

  {loading ? (
    <Loading />
  ) : (
    <>
      <section className="wrapper grid grid-cols-12 gap-2 px-2 pb-8 mt-4">
      {brands.map((brand) => {

        return (
          <article
            key={brand._id}
            className="col-span-4 md:col-span-3 lg:col-span-2 flex justify-center items-center"
          >
            <div className="relative flex justify-center items-center">
              <Link
                data-aos="zoom-in-up"
                data-aos-duration="500"
                to={`/brand/${brand._id}`}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="size-36 bg-white rounded-full shadow-md p-2 cursor-pointer object-contain hover:scale-[1.2] hover:-translate-y-8 duration-500"
                />
              </Link>
            </div>
          </article>
        );

      })}
    </section>
    <div className='flex justify-center items-center gap-4'>
      {[...Array(pagination?.numberOfPages)].map((item,index) =>(
        <button
          onClick={()=>{
            handelPageChange(index+1)
          }}
          className='btn'>{index+1}</button>
        ))}
          </div>
    </>
  )}
</main>

  );
}
