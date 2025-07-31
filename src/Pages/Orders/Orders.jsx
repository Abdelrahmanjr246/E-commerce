import React, { useEffect, useState } from 'react'
import EmptyOrder from '../../Components/EmptyOrder/EmptyOrder'
import axios from 'axios'
import OrderItem from '../../Components/OrderItem/OrderItem'
import Loading from '../../Components/Loading/Loading'
import BackToTop from '../../Components/BackToTop/BackToTop'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoBack from '../../Components/goBack/goBack'

export default function Orders() {

  const [ order , setOrder ] = useState([])
  const [loading , setLoading] = useState(false)

  async function getUserOrders() {
    setLoading(true)    
    const userId = localStorage.getItem('userId')
    try{
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      setOrder(data);
      setLoading(false)
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getUserOrders()
  },[])

  return (
    <>
      <div className='mt-20 p-4 '>
        <BackToTop/>
        {loading?<Loading/>: order?.length > 0?(
      <>
        <header className="flex items-center gap-6 mb-4">
                    <GoBack/>
                    <h2 className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-darkPrimary">Track your orders</span>
                            <FontAwesomeIcon icon={faTruckFast} className='text-primary text-2xl' />
                    </h2>
                </header>
        <div className='space-y-8'>
          {order.map((order)=>(<OrderItem order={order} key={order.id}/>))}
        </div>
      </>
        ):<EmptyOrder/>}
      </div>
    </>
  )
}
