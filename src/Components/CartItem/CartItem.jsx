import { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function CartItem({ item }) {

    const { deleteProductFromCart, updateCartProduct, disabled, cart } = useContext(cartContext);

    const [count, setCount] = useState(item?.count);

    // 🔄 Sync count with updated cart
    useEffect(() => {
        // Find the latest count for this product in cart
        const updatedItem = cart?.data?.products.find(
            (p) => p.product._id === item.product._id
        );
        if (updatedItem) setCount(updatedItem.count);
    }, [cart, item.product._id]);

    function updateCountManually() {
        const newCount = parseInt(count, 10);
        if (newCount === item?.count || isNaN(newCount)) return;
        updateCartProduct(newCount, item.product._id);
    }

    return (
        <div className="grid grid-cols-12 gap-6 pb-8 mt-4">
            
            {/* Product Image */}
            
            <div className="col-span-4 md:col-span-3 lg:col-span-2">
            
                <div className="inner rounded-3xl overflow-hidden  border-2 border-slate-200">
                    <img className="w-full block" 
                        src={item?.product?.imageCover}
                        alt={item?.product?.title}
                    />
                </div>

            </div>




            <div className="col-span-8 md:col-span-9 lg:col-span-10 flex max-lg:flex-col max-md:gap-4 justify-center items-start md:items-center">
                <div className="flex flex-col gap-1 w-full ">
                    
                    <Link to={`/productdetails/${item?.product?.id}`} className=" text-darkPrimary font-bold text-xl max-lg:line-clamp-1 hover:text-primary duration-300">{item?.product?.title || "No Title"}</Link>
                    
                    <div className="flex  gap-2 items-center">
                        <span className="text-darkPrimary">Rate :</span>
                        
                        <div className="rating flex gap-1 items-center">
                            ⭐
                            <span className="text-primary">
                                {item?.product?.ratingsAverage || "0"}
                            </span>
                        </div>
        
                    </div>
                    
                    <div className="text-primary text-base ">
                        <span className=" text-darkPrimary mr-1">Price :</span>
                        <span className="text-primary">EGP {item?.price}</span>
                    </div>
                    
                    <div className="text-gray-500 text-sm">
                        <span>{item?.product?.category?.name}</span>
                        <span className="mx-1">|</span>
                        <span>{item?.product?.brand?.name}</span>
                        <span className="mx-1">|</span>
                        <span className="text-green-500">Available</span>
                    </div>
                    
                </div>
                
                <div className="flex md:max-lg:mt-2 max-xs:flex-wrap justify-between items-center w-full">
  
                    <div className="flex max-sm:mt-2 justify-center items-center gap-3 border-2 border-gray-300 self-center  px-2 py-1 md:py-2 rounded-2xl ">
                    
                        <button disabled={disabled || count <= 1}
                            onClick={() => updateCartProduct(count - 1, item.product._id)}
                            className="text-2xl flex justify-center items-center cursor-pointer duration-100 hover:text-primary text-darkPrimary">
                            -
                        </button>

                        <input
                            className="w-10 font-bold text-base text-right text-darkPrimary outline-none"
                            onChange={(e) => setCount(Number(e.target.value))}
                            onBlur={updateCountManually}
                            value={count}
                            type="number"
                            min={1}
                        />

                        <button disabled={disabled || count <= 1}
                            onClick={() => updateCartProduct(count - 1, item.product._id)}
                            className="text-2xl flex justify-center items-center cursor-pointer duration-100 hover:text-primary text-darkPrimary">
                            +
                        </button>
                        
                    </div>
                    
                    <div className="text-primary  text-xs flex flex-col justify-center items-center">
                        <span className="font-medium text-xs text-darkPrimary">Total Price</span>
                        <span className="text-xs flex gap-1 items-center">
                            <span>EGP</span>
                            {item.price * item.count}
                        </span>
                    </div>
                    
                    <button
                        className="order-last border-2 border-transparent hover:text-red-600 hover:border-red-600 rounded-full group hover:rotate-90 duration-300 text-gray-500"
                        onClick={() => deleteProductFromCart(item?.product?._id)}
                        aria-label="Delete Product"
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-base" />
                    </button>


                </div>

            </div>

        </div>
    );
}
