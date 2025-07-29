import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderItem({order}) {
  return (
  <div className="p-4 md:p-6 border border-dashed border-slate-300 rounded-xl">
    
    <header className="flex max-xs:flex-col max-xs:items-start justify-between items-center border-b-2 border-slate-100 pb-6">
    
        <div className="flex flex-col gap-3 lg:flex-row lg:justify-between grow lg:gap-0 text-darkPrimary">
            
            <h2 className="flex">
                <span className="font-semibold text-nowrap">Transaction Number : </span>
                <span className="ml-1  text-nowrap">#{order.id}</span>
            </h2>
            
            <h3 className="flex gap-1 items-center">
                <span className="font-semibold">Placed on :</span>
                <div>{order.createdAt.slice(0,10)}</div>
            </h3>
            
            <h3>
                <span className="font-semibold">Payment : </span>
                <span className=' capitalize'>{order.paymentMethodType}</span>
            </h3>

        </div>

        <Link className="btn text-nowrap px-3 py-1 text-sm mb-4 lg:ml-20 max-lg:self-start" to={"/products"}>Add new items</Link>
    
    </header>
    
    <div className=" grid grid-cols-1 md:grid-cols-12 gap-2 mt-6">
        
        <div className="md:col-span-12 lg:col-span-8  xl:col-span-10 flex flex-wrap gap-8 ">
            {order?.cartItems?.map((item)=>(
                <article className="flex gap-6" key={item.id}>
                    
                    <div className="inner w-[150px] shrink-0 h-full rounded-lg overflow-hidden">
                        <img className="w-full h-full object-cover" src={item?.product?.imageCover} alt={item?.product.title} />
                    </div>
                    
                    <div className="flex flex-col gap-1 w-full ">
                        <Link className="font-medium hover:text-primary max-w-24 duration-300" to={"/product/6428ead5dc1175abc65ca0ad"}>
                            <span className='text-darkPrimary hover:text-primary'>{item?.product.title}</span>
                        </Link>
                        
                        <div className="text-primary text-base flex items-center ">
                            <span className=" text-darkPrimary mr-1">Price :</span>
                            <span className="flex gap-1"><span>EGP</span>{item?.price*item?.count}</span>
                        </div>
                        
                        <div className="text-primary text-base ">
                            <span className=" text-darkPrimary mr-1">Quantity :</span><span>{item?.count}</span>
                        </div>
                        
                        <div className="text-gray-500 flex flex-col text-sm">
                            <span>{item?.product.category.name}</span><span>{item?.product.brand.name}</span>
                        </div>
                        
                    </div>
                    
                </article>
            ))}
            
        </div>
        
        <div className="self-start md:col-span-12 md:place-content-center md:mt-4 lg:place-content-end lg:col-span-4  xl:col-span-2 flex justify-center items-center gap-2 ">
            
                {order.paymentMethodType =="cash"?<div className="flex flex-col gap-8 items-center justify-center">
                    
                    <div className="relative p-[11px] size-1 border border-primary rounded-full  flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                    
                        <div className=" size-1 p-[7px] rounded-full bg-primary" />
                    
                    </div>
                    
                    <div className="relative p-[11px] size-1 border border-primary rounded-full flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                        
                        <div className=" size-1 p-[7px] rounded-full bg-primary" />
                        
                    </div>
                    
                    <div className="relative p-[11px] size-1 border border-green-500  rounded-full  flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                        
                        <div className="size-1 p-[7px] rounded-full bg-green-500" />
                    
                    </div>
                    
                    <div className="relative p-[11px] size-1 border border-red-400 rounded-full  flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                        
                        <div className=" size-1 p-[7px] rounded-full bg-red-400 " />
                        
                    </div>
                    
                    <div className="p-[11px] size-1 border rounded-full flex items-center justify-center border-red-400">
                        
                        <div className="size-1 p-[7px] rounded-full bg-red-400" /></div>
                        
                </div>:
                <div className="flex flex-col gap-8 items-center justify-center">
                    
                    <div className="relative p-[11px] size-1 border border-primary rounded-full  flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                    
                        <div className=" size-1 p-[7px] rounded-full bg-primary" />
                    
                    </div>
                    
                    <div className="relative p-[11px] size-1 border border-primary rounded-full flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                        
                        <div className=" size-1 p-[7px] rounded-full bg-primary" />
                        
                    </div>
                    
                    <div className="relative p-[11px] size-1 border border-green-500  rounded-full  flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                        
                        <div className="size-1 p-[7px] rounded-full bg-green-500" />
                    
                    </div>
                    
                    <div className="relative p-[11px] size-1 border border-red-400 rounded-full  flex items-center justify-center after:w-[1px]  after:h-[33px] after:translate-x-1/2  after:bg-slate-400 after:absolute after:top-full after:right-1/2">
                        
                        <div className=" size-1 p-[7px] rounded-full bg-red-400 " />
                        
                    </div>
                    
                    <div className="p-[11px] size-1 border rounded-full flex items-center justify-center border-green-500">
                        
                        <div className="size-1 p-[7px] rounded-full bg-green-500" /></div>
                        
                </div>}
            
                
                <div className="flex flex-col gap-8 text-darkPrimary">
                    <h2>Ordered</h2>
                    <h2>Confirmed</h2>
                    <h2>Out for delivery</h2>
                    <h2>Delivered</h2>
                    <h2>Paid</h2>
                </div>
            
        </div>
            
    </div>
        
        <div className="mt-4 flex flex-col gap-2 text-darkPrimary">
            
            <h2 className="flex items-center gap-1">
                <span className="font-semibold">Products Quantity : </span>
                <span className="font-bold text-primary">{order?.cartItems.length}</span>
            </h2>
            
            <h2 className="flex gap-1 items-center">
                <span className="font-semibold">Shipping Price : </span>
                <span className="flex items-center text-primary">
                    <span className="text-xs me-0.5">EGP</span>
                    <span className="flex  font-bold">{order?.shippingPrice}</span>
                </span>
            </h2>
            
            <h2 className="flex gap-1 items-center">
                <span className="font-semibold">taxes : </span>
                <span className="flex items-center text-primary">
                    <span className="text-xs me-0.5">EGP</span>
                    <span className="flex  font-bold">{order?.taxPrice}</span>
                </span>
            </h2>
            
            <h2 className="flex items-center gap-1">
                <span className="font-semibold text-xl">Total Order Price : </span>
                <span className="flex text-primary"><span className="font-bold text-xl"> EGP {order?.totalOrderPrice}</span></span>
            </h2>
        </div>
    </div>
)
}
