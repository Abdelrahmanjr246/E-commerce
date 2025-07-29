import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ForgetPassword() {
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required.')
      .email('Must be a valid email.'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: sendDataToResetPassword,
    validationSchema,
  })

  async function sendDataToResetPassword(values) {
    const options = {
      url: 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      method: 'POST',
      data: values,
    }

    const loadingToast = toast.loading('Waiting...')

    try {
      const { data } = await axios.request(options)
      toast.success('Reset code sent to your email.')
      console.log(data)
    localStorage.setItem('forgotEmail', formik.values.email)
      setTimeout(() => {
        navigate('/verifyCode')
      }, 1500)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      toast.dismiss(loadingToast)
    }
  }

  return (
    <main className="container pt-[80px] pb-[30px]">
      <section className="flex flex-col justify-center items-center gap-8 mt-12">
        <header className="flex flex-col gap-4 text-center">
          <h2 className="font-extrabold text-primary text-2xl">
            Forgot your password?
          </h2>
          <p className="text-gray-500 text-sm">
            Your password will be reset by email.
          </p>
        </header>

        <form onSubmit={formik.handleSubmit}>
          <label
            className="text-left text-xs font-bold text-gray-600"
            htmlFor="email"
          >
            Enter your email address
          </label>

          <div className="mt-1 mb-5">
            <input
              id="email"
              type="email"
              name="email"
              className="input"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <footer className="text-center">
            <button type="submit" className="btn w-full py-1">
              Next
            </button>

            <Link
              className="text-xs text-primary font-bold inline-block mt-4 hover:underline"
              to="/login"
            >
              Back to log in
            </Link>
          </footer>
        </form>
      </section>
    </main>
  )
}
