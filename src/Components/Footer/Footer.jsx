import React from 'react'
import amazonLogo from '../../assets/amazon-pay-C6yg0mFR.png'
import americanexpressLogo from '../../assets/American-Express-Color-BA04NtD8.png'
import mastercardLogo from '../../assets/mastercard-DpLisAk5.webp'
import paypalLogo from '../../assets/paypal-f_p-vrjl.png'
import applestoreLogo from '../../assets/get-apple-store-9A-0RbJo.png'
import googleplayLogo from '../../assets/get-google-play-BORhnNzJ.png'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className=' bg-mainBg py-10 px-5'>
      <div className="container space-y-5">
        
        <div>
          <h3 className='text-darkPrimary text-2xl font-bold'>Get the FreshCart App</h3>
          <p className='text-slate-500'>We will send you a link, open it on your phone to download the app</p>
        </div>
        
        
        
        
        <div className='flex items-center gap-3 max-sm:flex-col sm:gap-6'>
          <input type="text" name='email' placeholder='Email...' className="input w-3/4 grow max-sm:w-full" />
          <button className='btn max-sm:w-full'>Share App Link</button>
        </div>
        
        
        
        <div className='flex justify-between items-center gap-4 border-y py-4 border-slate-200 max-sm:flex-wrap'>
          <div className='flex items-center gap-4'>
            <h3 className='text-darkPrimary text-nowrap'>Payment Partners</h3>
            <Link><img src={amazonLogo} className='w-16' alt="amazon" /></Link>
            <Link><img src={americanexpressLogo} className='w-16' alt='american express' /></Link>
            <Link><img src={mastercardLogo} className='w-16' alt="master card" /></Link>
            <Link><img src={paypalLogo} className='w-16' alt="paypal" /></Link>
          </div>

          <div className='flex items-center gap-4'>
            <h3 className='text-darkPrimary text-nowrap'>Get deliveries with FreshCart</h3>
            <Link><img src={applestoreLogo} alt="apple store" className='w-24'/></Link>
            <Link><img src={googleplayLogo} alt="google play" className='w-24' /></Link>
          </div>
        </div>


      </div>
    </footer>
  )
}
