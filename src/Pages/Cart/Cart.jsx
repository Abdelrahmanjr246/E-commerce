import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/CartContext';
import CartItem from '../../Components/CartItem/CartItem';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmptyCart from '../../Components/EmptyCart/EmptyCart';
import Loading from '../../Components/Loading/Loading';
import cashPaymentImg from '../../assets/cash1-DfoK3QaK.png';
import onlinePaymentImg from '../../assets/online1-CDuK_NPr.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import BackToTop from '../../Components/BackToTop/BackToTop';

export default function Cart() {
  const { cart, getLoggedUserCart, loading, clearCart } = useContext(cartContext);

  let navigate = useNavigate()

  let [pay , setPay] = useState('cash')

  useEffect(() => {
    getLoggedUserCart();
  }, []);


  async function payOnline(values){
    try{
      const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=https://abdelrahmanjr246.github.io/E-commerce/allorders`,{
        shippingAddress: values
      },{
        headers: { token: localStorage.getItem('token') }
      })
      if(data.status == 'success'){
        window.location.href = data.session.url;
      }
    }catch(err){
      console.log(err);
    }
  }

async function payCash(values){
    const loadingToast = toast.loading('waiting...')
    try{
      const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,{
        shippingAddress: values
      },{
        headers: { token: localStorage.getItem('token') }
      })
      toast.success("Order created successfully")
      setTimeout(() => {
        if(data.status == 'success'){
          navigate('/allorders')
          getLoggedUserCart()
        }
      },500);
      
    }catch(err){
      console.log(err);
    }finally{
      toast.dismiss(loadingToast)
    }
  }

  const phoneRegex = /^01[0125][0-9]{8}$/

  const validationSchema = Yup.object({
      details: Yup.string().required('Details are required.'),
      city: Yup.string().required('City is required.'),
      phone: Yup.string().required('Phone is required.').matches(phoneRegex,'Phone must be a vaild egyptian number.')
    })
  
    let formik =useFormik({
      initialValues:{
        details: '',
        phone: '',
        city: ""
      },
      onSubmit:(x)=>{
        if(pay=='cash'){
          payCash(x)
        }else{
          payOnline(x)
        }
      },
      validationSchema
    })



  return (
    <>
      {loading ? (
        <Loading />
      ) : cart?.data?.products.length > 0 ? (
        <>
          <BackToTop/>
          <section className="bg-mainBg p-5 mt-24 mb-5 rounded-3xl">
            
            <div className="container">
              {/* Header */}
              <header className="flex justify-between items-start px-2 my-4 gap-4">
                <div className="flex items-center gap-6">
                  <Link
                    to="/"
                    className="back-icon flex-shrink-0 self-start cursor-pointer size-[35px] rounded-full bg-primary flex justify-center items-center duration-300 hover:-translate-x-1 hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
                  </Link>
                  <h2 className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-darkPrimary">Shop Cart</span>
                    <FontAwesomeIcon icon={faOpencart} className="text-primary" />
                  </h2>
                </div>
                <div className="flex max-xs:self-center max-xs:mb-8 max-xs:mt-3 flex-col justify-center items-center gap-3">
                  <h3 className="font-semibold flex gap-2 text-nowrap text-primary">
                    <span className="text-darkPrimary">Total Price :</span>EGP {cart?.data?.totalCartPrice}
                  </h3>
                  <button
                    onClick={() => {
                      document.getElementById('checkOut')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn bg-white text-primary hover:text-white hover:bg-primary hover:border-primary border border-darkPrimary max-md:p-1 max-md:text-xs text-sm"
                  >
                    Check Out
                  </button>
                </div>
              </header>

                <div
                  onClick={() => clearCart()}
                  className="btn py-1 bg-red-600 text-white cursor-pointer rounded-md hover:bg-red-700 duration-200"
                >
                  <FontAwesomeIcon icon={faTrash} /> Clear All Products
                </div>

              {/* Cart Items */}
              <div className="divide-y-2 divide-gray-200 pt-4">
                {cart?.data?.products.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </div>
            </div>



            <div id="checkOut" className="container max-w-[535px] mt-12">
            
              <span className="block mt-12 mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>
              <h2 className="text-center text-darkPrimary my-2 font-bold text-lg Outfit">Check Out</h2>
              <span className="block  mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>

              <form
                onSubmit={formik.handleSubmit}
                className="w-full p-8 border border-gray-300 rounded-lg duration-700 target:border-darkPrimary   flex flex-col gap-6 mt-12"
              >
                <h3 className="font-bold text-lg -ml-2 text-darkPrimary">Cart totals</h3>

                <div className="flex  gap-4 items-center">
                  <span className="font-bold text-darkPrimary">Total :</span>
                  <span className="text-primary font-semibold">
                    EGP {cart?.data?.totalCartPrice}
                  </span>
                </div>
                <div>
                  <input
                    className="p-2 w-full input"
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Your City Name"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.city && formik.touched.city && (
                    <p className="text-red-600 font-bold text-sm -my-3 ">
                      {formik.errors.city}
                    </p>
                )}



                <div>
                  <input
                    className="p-2 w-full input"
                    autoComplete="off"
                    type="tel"
                    placeholder="Enter Your Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onInput={() => {}}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.phone && formik.touched.phone && (
                    <p className="text-red-600 font-bold text-sm -my-3 ">
                      {formik.errors.phone}
                    </p>
                )}
              
                {/* )} */}
                <div>
                  <textarea
                    className="p-2 w-full input"
                    placeholder="Details"
                    name="details"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    onInput={() => {}}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.details && formik.touched.details && (
                    <p className="text-red-600 font-bold text-sm -my-3 ">
                      {formik.errors.details}
                    </p>
                )} 

                <div className=" flex max-md:flex-col  gap-4 justify-between items-center">
                  <button
                    type="submit"
                    onClick={()=>{
                      setPay('cash')
                    }}
                    className="btn cursor-pointer bg-primary hover:bg-darkPrimary text-white w-full flex py-1 text-nowrap items-center justify-center gap-2"
                  >
                    <img
                      className="size-10"
                      src={cashPaymentImg}
                      alt="Cash Payment Img"
                    />
                    <span> Cash Order</span>
                  </button>
                  <button
                    type="submit"
                    onClick={()=>{
                      setPay('online')
                    }}
                    className="btn cursor-pointer flex py-1 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-darkPrimary bg-white text-darkPrimary w-full"
                  >
                    <img
                      className="size-10 object-cover"
                      src={onlinePaymentImg}
                      alt="Online Payment Img"
                    />
                    <span>Online Order</span>
                  </button>
                </div>
              </form>
            
            </div>

          </section>
        </>
      ) : (
        <div className='mt-24 '>
          <EmptyCart />
        </div>
      )}
    </>
  );
}
