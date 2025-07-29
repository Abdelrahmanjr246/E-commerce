import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function VerifyCode() {
  
  
  
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required('Email is required.')
  })

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: sendDataToVerifyCode,
    validationSchema,
  })

  async function sendDataToVerifyCode(values) {
    const options = {
      url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      method: 'POST',
      data: values,
    }

    const loadingToast = toast.loading('Waiting...')

    try {
      const { data } = await axios.request(options)
      toast.success('Success')
      console.log(data)

      setTimeout(() => {
        navigate('/resetPassword')
      }, 1500)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      toast.dismiss(loadingToast)
    }
  }
  
  
  
  
   return (
    <main className="container pt-[90px] pb-[30px]">
        
        <section>
            
            <header className="text-center space-y-2">
                <FontAwesomeIcon icon={faEnvelope} className=" text-primary text-3xl"/>
                <h2 className="text-2xl font-bold text-darkPrimary">Check your email</h2>
                <p className="text-xs text-darkPrimary">Reset code sent to your email</p>
                
            </header>
            
            <form onSubmit={formik.handleSubmit}>
                
                <div className="mt-5 mb-5 text-center">
                    
                    <input
                        type="text" 
                        name="resetCode"
                        value={formik.values.resetCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control input w-fit placeholder:text-xs" 
                        placeholder="Enter Reset Code"
                    />
                    {formik.errors.resetCode && formik.touched.resetCode && (
                        <p className="text-red-600">{formik.errors.resetCode}</p>
                    )}
                
                </div>
                
                <footer className="text-center">
                    
                    <div className="w-full">
                        
                        <button type="submit" className="btn px-5 py-1">Next</button>
                        
                    </div>
                    
                    <Link className="text-xs text-primary font-bold inline-block mt-4 hover:underline" to={"/forgetPassword"}>
                        Back To Forgot your password
                    </Link>
                    
                </footer>
                
            </form>
            
        </section>
        
    </main>
  )
}
