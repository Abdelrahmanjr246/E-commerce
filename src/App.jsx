// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from "./Pages/Layout/Layout"
import Home from "./Pages/Home/Home"
import Products from "./Pages/Products/Products"
import Categories from "./Pages/Categories/Categories"
import Cart from "./Pages/Cart/Cart"
import Brands from "./Pages/Brands/Brands"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import { Toaster } from "react-hot-toast"
import Orders from "./Pages/orders/Orders"
import FavProducts from "./Pages/WishList/WishList"
import ProtectedRoutes from "./Protected/ProtectedRoutes"
import AuthContextProvider from "./Context/AuthContext"
import LoginProtected from "./Protected/LoginProtected"
import ProductDetails from "./Pages/Product Details/ProductDetails"
import CartContextProvider from "./Context/CartContext"
import WishList from "./Pages/WishList/WishList"
import WishlistContextProvider from "./Context/WishlistContext"
import CategoryProductsWrapper from "./Components/CategoryProducts/CategoryProductsWrapper"
import BrandProductsWrapper from "./Components/BrandProducts/BrandProductsWrapper"
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword"
import VerifyCode from "./Pages/VerifyCode/VerifyCode"
import ResetPassword from "./Pages/ResetPassword/ResetPassword"

function App() {

  let routes = createBrowserRouter([
    {path:'/',element: <Layout/>,children:[
      {path:'/',element: <Home/>},
      {path:'/products',element: <Products/>},
      {path:'/productdetails/:id',element: <ProductDetails/>},
      {path:'/categories',element: <Categories/>},
      {path:"/category/:id", element:<CategoryProductsWrapper/>},

      {path:'/brands',element: <Brands/>},
      {path:"/brand/:id", element:<BrandProductsWrapper/>},

      {path:'/allorders',element:<ProtectedRoutes><Orders/></ProtectedRoutes> },


      {path:'/wishList',element: <ProtectedRoutes><WishList/></ProtectedRoutes>},
      {path:'/cart',element: <ProtectedRoutes><Cart/></ProtectedRoutes> },

      {path:'/login',element: <LoginProtected><Login/></LoginProtected> },
      {path:'/forgetPassword',element: <LoginProtected><ForgetPassword/></LoginProtected> },
      {path:'/verifyCode',element: <LoginProtected><VerifyCode/></LoginProtected> },
      {path:'/resetPassword',element: <LoginProtected><ResetPassword/></LoginProtected> },
      {path:'/register',element: <LoginProtected><Register/></LoginProtected> },
    ]}
  ])








  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={routes}/>
            <Toaster 
              toastOptions={{
                success: {
                  style: {
                    color: '#01854c',
                    fontSize: '1rem',
                    fontWeight: 'bolder'
                  },
                }
              }}/>
          </WishlistContextProvider>
        </CartContextProvider> 
      </AuthContextProvider>
    </>
  )
}

export default App
