import { X } from 'lucide-react'

export default function FilterSidebar({
  isOpen,
  onClose,
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
}) {

  const categories = ['Women\'s Fashion', 'Men\'s Fashion', 'Electronics']
  const brands = ['Canon', 'Dell', 'Defacto', 'Puma']

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }


  
  return (
    <div className={`fixed z-100 top-0 left-0 h-full w-[320px] bg-white shadow-lg px-2 py-1 overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-darkPrimary">SORT</h2>
        <button onClick={onClose}><X className="text-primary cursor-pointer" /></button>
      </div>

      <div className="mb-2">
        <p className="font-semibold text-darkPrimary mb-2">Price :</p>
        <div className="space-y-2 ps-2">
          <label className="flex items-center gap-2 text-primary">
            <input
              type="radio"
              name="priceSort"
              value="asc"
              checked={sortOrder === 'asc'}
              onChange={() => setSortOrder('asc')}
            />
            smaller to Bigger
          </label>
          <label className="flex items-center gap-2 text-primary">
            <input
              type="radio"
              name="priceSort"
              value="desc"
              checked={sortOrder === 'desc'}
              onChange={() => setSortOrder('desc')}
            />
            Bigger to smaller
          </label>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-darkPrimary mb-2">FILTER</h2>

      <div className="mb-3">
        <p className="font-semibold text-darkPrimary mb-2">Price Range :</p>
        <input
          type="range"
          min={0}
          max={50000}
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full accent-primary"
        />
        <p className="mt-2 text-sm text-primary">
          Max Salary now is (EGP {parseInt(priceRange).toLocaleString()})
        </p>
      </div>

      <div className="mb-3">
        <p className="font-semibold text-darkPrimary mb-1">Categories</p>
        <div className="ps-2 space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2 text-primary">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold text-darkPrimary mb-1">Brands</p>
        <div className="ps-2 space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 text-primary">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
