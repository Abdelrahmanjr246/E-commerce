import { faCartPlus, faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';

export default function WishlistItem({item}) {
    console.log(item);


    let {deleteProductFromWishlist} = useContext(wishlistContext);


    let {addProductToCart} =useContext(cartContext);
    


    async function addProductToCartFromWishlist(productId) {
        await addProductToCart(productId);
        deleteProductFromWishlist(productId);
    }






  return (
    <article className="wrapper grid grid-cols-12 gap-6 mt-4 pb-8 mx-3">

        <div className="col-span-4 md:col-span-3 lg:col-span-2">
            
            <div className="inner rounded-3xl overflow-hidden  border-2  border-slate-200">
                <img src={item?.imageCover} className="w-full block" alt={item?.title} />
            </div>

        </div>



        <div className="col-span-8 md:col-span-9 lg:col-span-10  flex  max-lg:flex-col max-md:gap-4 justify-center items-start md:items-center ">

            <div className="flex flex-col items-start justify-center gap-1 w-full ">
                <Link className="font-bold text-xl max-lg:line-clamp-1 text-darkPrimary hover:text-primary duration-300" to={`/productdetails/${item?.id}`}>
                    <h2 className="text-lg font-bold text-darkPrimary cursor-pointer hover:text-primary">
                        {item?.title || "No Title"}
                    </h2>
                </Link>
                
                <div className="flex gap-2">
                    <span className=" text-darkPrimary">Rate :</span>
                    <span className="text-primary flex items-center gap-1">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        {item?.ratingsAverage}
                    </span>
                </div>
            
                <div className="text-primary text-base ">
                    <span className=" text-darkPrimary mr-1">Price :</span>
                    <span>EGP {item?.price}</span>
                </div>
                
                <div className="text-gray-500 text-sm">
                    <span>{item?.category?.name}</span>
                    <span className="mx-1">|</span>
                    <span>{item?.brand?.name}</span>
                    <span className="mx-1">|</span>
                    <span className="text-green-500">Available</span>
                </div>
            
            </div>
            
            <div className="mt-4 flex max-xs:flex-col items-center gap-3">

                <button onClick={()=>(addProductToCartFromWishlist(item.id))} className="btn gap-1 rounded-3xl text-sm w-full group flex items-center">
                    <FontAwesomeIcon icon={faCartPlus} className="text-white" />
                    <span className="text-nowrap">ADD TO CART</span>
                </button>
                

                <button onClick={()=>(deleteProductFromWishlist(item.id))}  className="btn px-4  flex items-center gap-1 rounded-3xl group text-sm cursor-pointer  py-2 bg-red-500 hover:bg-red-700 duration-300">
                    <FontAwesomeIcon icon={faTrashCan} className="text-white" />
                    <span>Remove</span>
                </button>

            </div>

        </div>

    </article>

  )
}
