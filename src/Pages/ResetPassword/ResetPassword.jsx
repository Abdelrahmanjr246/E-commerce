import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authContext } from '../../Context/AuthContext'

export default function ResetPassword() {
  
    const email = localStorage.getItem('forgotEmail')



    let {setToken} = useContext(authContext)

    let navigate = useNavigate()
    const passwordRegex = /^[A-Z][A-Za-z0-9]{5,}$/
    const [showPass,setShowPass] =useState('password')
    const [showRePass, setShowRePass] = useState('password');


    const validationSchema = Yup.object({
        newPassword: Yup.string().required('Password is required.').matches(passwordRegex,'Password must start with capital letter & at least 5 chars.'),
        rePassword: Yup.string().required('Re-Password is required.').oneOf([Yup.ref('newPassword')],'Re-password must match the password.'),
    })

  let formik =useFormik({
    initialValues:{
      email,
      newPassword:"",
      rePassword:"",
    },
    onSubmit:sendDataToResetPassword,
    validationSchema
  })

  async function sendDataToResetPassword(values){    
    const options ={
      url : 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      method: 'Put',
      data: values,
      header: localStorage.getItem('resetToken')
    }
    let loadingToast = toast.loading('loading...')
    try{
      const {data} = await axios.request(options);
      toast.success('Password Changed Successfully.')
      localStorage.setItem('token',data.token)
      setToken(data.token)
      setTimeout(()=>{
        navigate('/')
      },1500)
      console.log(data);
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message)
    }finally{
      toast.dismiss(loadingToast)
    }
  }

  function toggleShowPass(){
    setShowPass(showPass == 'password'? 'text' : 'password')
  }
  function toggleShowRePass(){
    setShowRePass(showRePass == 'password'? 'text' : 'password')
  }
    

   return (

    <main className="container pt-[80px] pb-[30px]">
        
        <section className="flex flex-col justify-center items-center gap-8 mt-12">
            
            <header className="flex flex-col gap-4 text-center">
                <h2 className="font-extrabold text-primary text-2xl">Create New password</h2>
                <p className="text-gray-500 text-sm">This password should be different from the <br />previous password.</p>
            </header>
            
            <form onSubmit={formik.handleSubmit}>
                
                <div className="mb-4 w-[300px]">
                    <div className="mb-3 relative text-darkPrimary">
                        <input 
                            className="form-control input w-full placeholder:text-sm" 
                            type={showPass}
                            name="newPassword" 
                            placeholder="New Password"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.newPassword && formik.touched.newPassword && (<p className=' text-red-600'>{formik.errors.newPassword}</p>)}

                        {showPass == 'password'?
                            <FontAwesomeIcon icon={faEye} className=' absolute right-2 top-3 cursor-pointer' onClick={toggleShowPass} />
                            :<FontAwesomeIcon icon={faEyeSlash} className=' absolute right-2 top-3 cursor-pointer' onClick={toggleShowPass} />
                        }
                    </div>
                </div>
                
                <div className="mb-3 relative text-darkPrimary">
                    <input 
                        className="form-control input w-full placeholder:text-sm" 
                        type={showRePass} 
                        name="rePassword" 
                        placeholder="Confirm Password"
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.rePassword && formik.touched.rePassword && (<p className=' text-red-600'>{formik.errors.rePassword}</p>)}

                    {showRePass == 'password'?
                        <FontAwesomeIcon icon={faEye} className=' absolute right-2 top-3 cursor-pointer' onClick={toggleShowRePass} />
                        :<FontAwesomeIcon icon={faEyeSlash} className=' absolute right-2 top-3 cursor-pointer' onClick={toggleShowRePass} />
                    }
                </div>
                
                <footer className="text-center">
                    
                    <button type="submit" className="btn w-full py-2">Reset Password</button>
                    <Link className="text-xs text-primary font-bold inline-block mt-4 hover:underline" to={"/login"}>
                        Back to log in
                    </Link>
                    
                </footer>
                
            </form>
            
        </section>
        
    </main>
  )
}
