import axios from 'axios';
import { useFormik } from 'formik';
import { User } from 'lucide-react';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authContext } from '../../Context/AuthContext';
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login() {

  const { getLoggedUserCart } = useContext(cartContext);
  const { getLoggedUserWishlist } = useContext(wishlistContext);

  let navigate = useNavigate()

  const [error,setError] =useState('')
  const [showPass,setShowPass] =useState('password')

  let {setToken} = useContext(authContext);

  const passwordRegex = /^[A-Z][A-Za-z0-9]{5,}$/

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required.').email('Must be a valid email.'),
    password: Yup.string().required('Password is required.').matches(passwordRegex,'Password must start with capital letter & at least 5 chars.'),
  })

  let formik =useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    onSubmit:sendDataToLogin,
    validationSchema
  })

  async function sendDataToLogin(values){    
    const options ={
      url : 'https://ecommerce.routemisr.com/api/v1/auth/signin',
      method: 'Post',
      data: values
    }
    let loadingToast = toast.loading('loading...')
    try{
        const {data} = await axios.request(options);
        toast.success(`Welcome ${data.user.name}`)
        console.log(data);
        console.log(data.token);
        localStorage.setItem('token', data.token)
        setToken(data.token)
        getLoggedUserCart();
        getLoggedUserWishlist();
        setTimeout(()=>{
          navigate('/')
        },1500)
      }
        catch(error){
        console.log(error);
        toast.error(error.response.data.message)
        setError(error.response.data.message)
      }finally{
        toast.dismiss(loadingToast)
      }
    }


  function toggleShowPass(){
    setShowPass(showPass == 'password'? 'text' : 'password')
  }
  return (
    <div className="pt-[80px] pb-[30px] flex flex-col justify-center sm:py-12">
      <div className="p-3 mx-auto max-w-lg w-full">
        <h1 className="font-bold text-center text-primary text-2xl my-6 flex justify-center gap-1.5"><User /> Login</h1>  

        <div className="rounded-lg w-full m-auto">
          <form onSubmit={formik.handleSubmit}>
              <div className="px-5 py-2 space-y-4 text-darkPrimary">

                {/* EMAIL */}

                <input type="text" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter Your Email' className="input" />
                {formik.errors.email && formik.touched.email && (<p className=' text-red-600'>{formik.errors.email}</p>)}

                {/* PASSWORD */}

                <div className=' relative'>
                  <input type={showPass} name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter Your Password' className="input" />
                  {formik.errors.password && formik.touched.password && (<p className=' text-red-600'>{formik.errors.password}</p>)}

                  {showPass == 'password'?
                  <FontAwesomeIcon icon={faEye} className=' absolute right-2 top-3 cursor-pointer' onClick={toggleShowPass} />
                  :<FontAwesomeIcon icon={faEyeSlash} className=' absolute right-2 top-3 cursor-pointer' onClick={toggleShowPass} />
                  }
                </div>

                <button type="submit" className="btn w-full">
                  <span className="inline-block mr-2">Log in</span>
                </button>
                {error && (<p className='text-red-600'>{error}</p>)}
              </div>
          </form>

          <div className="py-1">
            <div>
              <div className="flex justify-between px-5">
                <Link to={'/forgetPassword'} className='transition duration-200 cursor-pointer font-normal text-sm text-primary hover:border-b'>Forget your password ?</Link>
                <Link to={'/register'} className='transition duration-200 cursor-pointer font-normal text-sm text-primary hover:border-b'>Create New Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
