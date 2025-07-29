import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

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
        <div className="justify-between mb-6 p-6 sm:flex sm:justify-start">
            {/* Product Image */}
            <img
                src={item?.product?.imageCover}
                alt="product"
                className="w-full rounded-2xl border-2 border-slate-200 sm:w-40"
            />

            <div className="items-center sm:ml-4 sm:flex sm:w-full sm:justify-between">
                {/* Product Details */}
                <div className="mt-5 sm:mt-0">
                    <Link to={`/productdetails/${item?.product?.id}`}>
                        <h2 className="text-lg font-bold text-darkPrimary cursor-pointer hover:text-primary">
                            {item?.product?.title || "No Title"}
                        </h2>
                    </Link>
                    <p className="flex items-center gap-1 text-primary">
                        <span className="text-darkPrimary">Rate:</span>
                        <div className="rating flex gap-1 items-center">
                            ⭐
                            <span className="text-primary">
                                {item?.product?.ratingsAverage || "0"}
                            </span>
                        </div>
                    </p>

                    <p className="flex items-center gap-1 text-primary">
                        <span className="text-darkPrimary">Price:</span>
                        <span className="text-primary">EGP {item?.price}</span>
                    </p>

                    <div className="text-gray-500 text-sm">
                        <span>{item?.product?.category?.name}</span>
                        <span className="mx-1">|</span>
                        <span>{item?.product?.brand?.name}</span>
                        <span className="mx-1">|</span>
                        <span span className="text-green-500">Available</span>
                    </div>
                </div>



                <div className='flex justify-around grow p-4'>


                    {/* Quantity Controls */}
                    <div className="flex items-center border-2 border-gray-300 rounded-2xl p-1">
                        <button
                            disabled={disabled || count <= 1}
                            onClick={() => updateCartProduct(count - 1, item.product._id)}
                            className="cursor-pointer text-2xl rounded-l py-1 px-3.5 duration-100 hover:text-primary text-darkPrimary"
                        >
                            -
                        </button>

                        <input
                            className="h-8 w-8 text-right text-darkPrimary outline-none"
                            onChange={(e) => setCount(Number(e.target.value))}
                            onBlur={updateCountManually}
                            value={count}
                            type="number"
                            min={1}
                        />

                        <button
                            disabled={disabled}
                            onClick={() => updateCartProduct(count + 1, item.product._id)}
                            className="cursor-pointer text-2xl rounded-r py-1 px-3.5 duration-100 hover:text-primary text-darkPrimary"
                        >
                            +
                        </button>
                    </div>


                    <div className='flex items-center gap-8'>
                        <p className="text-sm text-primary flex flex-col"><span className=' text-darkPrimary'>Total Price</span>EGP {item.price * item.count}</p>

                        {/* Delete Product */}
                        <svg
                            onClick={() => deleteProductFromCart(item?.product?._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 text-slate-500 hover:text-red-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        
                    </div>

                </div>

                
            </div>
        </div>
    );
}
