import React, { useEffect, useRef, useState } from 'react'
import Card from '../../Components/Card/Card'
import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
import BackToTop from '../../Components/BackToTop/BackToTop'
import FilterSidebar from '../../Components/FilterSidebar/FilterSidebar'
import filterIcon from '../../assets/filter-Bmu1_gjf.png'
import GoBack from '../../Components/goBack/goBack'

export default function Products() {
  const [products, setProducts] = useState([]) // ✅ initialize as empty array
  const [pagination, setPagination] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [priceRange, setPriceRange] = useState(50000)
  const [sortOrder, setSortOrder] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const filterIconRef = useRef();


  const getAllProducts = async (page = 1) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
      )
      setProducts(data.data)
      setPagination(data.metadata)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const handlePageChange = (index) => {
    getAllProducts(index)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  const closeSidebar = () => setIsSidebarOpen(false)

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => product.price <= priceRange)
    .filter(
      (product) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category?.name)
    )
    .filter(
      (product) =>
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand?.name)
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price
      if (sortOrder === 'desc') return b.price - a.price
      return 0
    })

  return (
    <>
      <BackToTop />

      <div className='mt-18 pb-2 space-y-7'>
        {products.length > 0 || pagination ? (
          <section>
            <FilterSidebar
              isOpen={isSidebarOpen}
              onClose={closeSidebar}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              filterIconRef={filterIconRef}
            />

            <nav className="fixed left-0 right-0 max-xs:flex-wrap pt-[10px] bg-mainBg px-4 pb-3 z-30 flex items-center justify-between mb-3 gap-2 sm:gap-6">
              <div className="max-xs:w-full">
                <GoBack />
              </div>

              <div className="relative max-xs:flex-grow max-xs:order-first">
                <label htmlFor="search" className="absolute top-1/2 -translate-y-1/2 right-[15px]">
                  <i className="fa-solid fa-magnifying-glass text-slate-300 text-sm" />
                </label>

                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoComplete="off"
                  id="search"
                  className="form-control bg-white rounded-3xl px-3 placeholder:text-sm max-xs:w-full input"
                  type="text"
                  placeholder="Search"
                />
              </div>

              <div className="size-8 cursor-pointer max-xs:order-first">
                <img
                  ref={filterIconRef}
                  src={filterIcon}
                  onClick={(e) => {
    e.stopPropagation(); // prevent closing due to outside click
    setIsSidebarOpen(prev => !prev);
  }}
                  className="size-full active:scale-90 duration-150"
                  alt="filter"
                />
              </div>
            </nav>

            <div className="grid grid-cols-12 max-md:px-16 gap-6 p-4 pt-20 mt-20">
              {filteredProducts.map((item) => (
                <Card itemInfo={item} key={item.id} />
              ))}
            </div>

            {pagination && (
              <div className='flex justify-center items-center gap-4'>
                {[...Array(pagination.numberOfPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className='btn'
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </section>
        ) : (
          <Loading />
        )}
      </div>
    </>
  )
}
