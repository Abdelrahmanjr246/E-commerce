import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useFormik } from 'formik';
import { User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {

  let navigate = useNavigate()
  const passwordRegex = /^[A-Z][A-Za-z0-9]{5,}$/
  const phoneRegex = /^01[0125][0-9]{8}$/
  const [showPass,setShowPass] =useState('password')
  const [showRePass, setShowRePass] = useState('password');


  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required.').min(3,"Name must be at least 3 chars.").max(20,"Name must be less than 20 chars."),
    email: Yup.string().required('Email is required.').email('Must be a  valid email.'),
    password: Yup.string().required('Password is required.').matches(passwordRegex,'Password must start with capital letter & at least 5 chars.'),
    rePassword: Yup.string().required('Re-Password is required.').oneOf([Yup.ref('password')],'Re-password must match the password.'),
    phone: Yup.string().required('Phone is required.').matches(phoneRegex,'Phone must be a vaild egyptian number.')
  })

  let formik =useFormik({
    initialValues:{
      name: "",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    onSubmit:sendDataToRegister,
    validationSchema
  })

  async function sendDataToRegister(values){    
    const options ={
      url : 'https://ecommerce.routemisr.com/api/v1/auth/signup',
      method: 'Post',
      data: values
    }
    let loadingToast = toast.loading('loading...')
    try{
      const {data} = await axios.request(options);
      toast.success('Successfully registered.')
      setTimeout(()=>{
        navigate('/login')
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
    <div className="flex flex-col justify-center mt-16 sm:py-12">
      <div className="p-3 xs:p-0 mx-auto max-w-lg w-full">
        
        <h1 className="font-bold text-center text-primary text-2xl mb-1 flex justify-center gap-1.5"><User /> Register Now</h1>  

        <div className="rounded-lg w-full m-auto">
          <form onSubmit={formik.handleSubmit}>
              <div className="px-5 py-2 space-y-4 text-darkPrimary">

                {/* NAME */}

                <input type="text" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter Your Name' className="input" />
                {formik.errors.name && formik.touched.name && (<p className=' text-red-600'>{formik.errors.name}</p>)}
                
                {/* EMAIL */}

                <input type="text" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter Your Email' className="input" />
                {formik.errors.email && formik.touched.email && (<p className=' text-red-600'>{formik.errors.email}</p>)}

                {/* PASSWORD */}

                <div className="relative">
                  <input type={showPass} name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter Your Password' className="input" />
                  {formik.errors.password && formik.touched.password && (<p className=' text-red-600'>{formik.errors.password}</p>)}

                  {showPass == 'password'?
                    <FontAwesomeIcon icon={faEye} className=' absolute right-2 top-3 cursor-pointer' onClick={toggleShowPass} />
                    :<FontAwesomeIcon icon={faEyeSlash} className=' absolute right-2 top-3 cursor-pointer' onClick={toggleShowPass} />
                  }
                </div>

                {/* RE_PASSWORD */}

                <div className="relative">
                  <input type={showRePass} name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter Your Re-Password' className="input" />
                  {formik.errors.rePassword && formik.touched.rePassword && (<p className=' text-red-600'>{formik.errors.rePassword}</p>)}
                
                  {showRePass == 'password'?
                    <FontAwesomeIcon icon={faEye} className=' absolute right-2 top-3 cursor-pointer' onClick={toggleShowRePass} />
                    :<FontAwesomeIcon icon={faEyeSlash} className=' absolute right-2 top-3 cursor-pointer' onClick={toggleShowRePass} />
                  }
                </div>

                {/* PHONE */}

                <input type="tel" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter Your Phone' className="input" />
                {formik.errors.phone && formik.touched.phone && (<p className=' text-red-600'>{formik.errors.phone}</p>)}




                <button type="submit" className="btn w-full">
                  <span className="inline-block mr-2">Register</span>
                </button>
              </div>
          </form>
          <div className="py-1">
            <div>
              <div className="text-center">
                  <Link to={'/login'} className='transition duration-200 cursor-pointer font-normal text-sm text-primary hover:border-b'>Already have an account ?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
