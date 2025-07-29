import React, { useContext, useEffect } from 'react';
import EmptyWishlist from '../../Components/EmptyWishlist/EmptyWishlist';
import { wishlistContext } from '../../Context/WishlistContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'; // ✅ Correct import
import WishlistItem from '../../Components/WishlistItem.jsx/WishlistItem';
import Loading from '../../Components/Loading/Loading';
import BackToTop from '../../Components/BackToTop/BackToTop';

export default function WishList() {
  const { wishlist, loading, getLoggedUserWishlist , clearWishlist} = useContext(wishlistContext);

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : wishlist?.data?.length > 0 ? (
        <>
          <BackToTop/>
          <section className="bg-mainBg p-5 mb-4 mt-24 rounded-3xl space-y-10">
            <header className="flex items-center gap-6">
              <Link
                to="/"
                className="back-icon flex-shrink-0 self-start cursor-pointer size-[35px] rounded-full bg-primary flex justify-center items-center duration-300 hover:-translate-x-1 hover:scale-105"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
              </Link>
              <h2 className="flex items-center gap-2">
                <span className="text-2xl font-bold text-darkPrimary">Favorite Products</span>
                <FontAwesomeIcon icon={faGratipay} className="text-primary text-xl" />
              </h2>
            </header>


            
              <button
                onClick={clearWishlist}
                className="btn py-1 bg-red-600 text-white cursor-pointer rounded-md hover:bg-red-700 duration-200"
              >
                Clear All
              </button>
          




            <footer className=" space-y-2 divide-y-2 divide-gray-200 flex flex-col justify-center gap-2 text-center">
              {wishlist.data.map((item) => (
                <WishlistItem key={item.id} item={item} />
              ))}
            </footer>
          </section>
        </>
      ) : (
        <div className='mt-24'>
          <EmptyWishlist />
        </div>
      )}
    </>
  );
}
