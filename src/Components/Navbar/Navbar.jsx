import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faLinkedin,
  faOpencart,
} from "@fortawesome/free-brands-svg-icons";
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../../Context/AuthContext';
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let {token,setToken} = useContext(authContext);

  const logout = () => {
    const loadingToast = toast.loading("logging out..")
    setTimeout(() => {
      localStorage.removeItem('token');
      setToken(null);
      toast.success("logged out")
      toast.dismiss(loadingToast)
    }, 1000);
    
  }

  let {cart} = useContext(cartContext);
  let {wishlist} = useContext(wishlistContext);



  return (
    <nav className="bg-mainBg py-5 fixed right-0 left-0 top-0 z-99">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left: Logo + NavLinks */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <h1 className="text-darkPrimary text-2xl font-bold">
            <Link to={"/"}>
              <FontAwesomeIcon icon={faOpencart} className="text-primary" />
              <span> FreshCart</span>
            </Link>
          </h1>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-5">
            <li className="text-slate-500 hover:text-primary">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="text-slate-500 hover:text-primary">
              <NavLink to={"/products"}>Products</NavLink>
            </li>
            <li className="text-slate-500 hover:text-primary">
              <NavLink to={"/categories"}>Categories</NavLink>
            </li>
            <li className="text-slate-500 hover:text-primary">
              <NavLink to={"/brands"}>Brands</NavLink>
            </li>
            {localStorage.getItem('token') ? 
              <li className="text-slate-500 hover:text-primary">
                <NavLink to={"/allorders"}>Orders</NavLink>
              </li> 
            : null}
          </ul>
        </div>

        {/* Right: Cart/Fav + Social Icons + Auth Links */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart & Favorites */}
          { token ? 
            <ul className="flex items-center gap-3">
              <li>
                <Link to={"/wishList"} className="text-darkPrimary">
                  {wishlist?.data?.length > 0 ? <Heart size={24} fill= '#01854c' className='hover:text-primary hover:fill-primary'/> : <Heart size={24}  />}
                </Link>
              </li>
              <li className=' relative'>
                <Link to={'/cart'} className="text-darkPrimary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                  </svg>
                </Link>
                {cart?.numOfCartItems > 0 && (
                  <div className="absolute -top-1.5 -left-1.5 font-bold bg-primary size-5 flex justify-center items-center text-white rounded-full">
                    {cart.numOfCartItems}
                  </div>
                )}
              </li>
          </ul>
          : null}

          {/* Auth Links */}

          {/* Social Icons */}
          <ul className="flex items-center gap-3">
            <li className="text-[#0866ff]">
              <a href="http://" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li className="text-[#ff115b]">
              <a href="http://" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li className="text-black">
              <a href="http://" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </li>
            <li className="text-[#0a66c2]">
              <a href="http://" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>

          {/* Auth Links */}
          <ul className="flex items-center gap-3">
            {!token ?
              <>
                <li className="text-slate-500">
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
                <li className="text-slate-500">
                  <NavLink to={"/register"}>Register</NavLink>
                </li>
              </>
              : <li className="text-slate-500 cursor-pointer" onClick={logout}>LogOut</li>
            }
          </ul>
        </div>

        {/* Mobile: Cart/Fav + Hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center gap-3">
            {token ? (
              <>
                <Link to={"/wishList"} className="text-darkPrimary">
                  {wishlist?.data?.length > 0 ? (
                    <Heart size={24} fill="#01854c" className="hover:text-primary hover:fill-primary" />
                  ) : (
                    <Heart size={24} />
                  )}
                </Link>

                <div className="relative">
                  <Link to={"/cart"} className="text-darkPrimary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                  </Link>
                  {cart?.numOfCartItems > 0 && (
                  <div className="absolute -top-1.5 -left-1.5 font-bold bg-primary size-5 flex justify-center items-center text-white rounded-full">
                    {cart.numOfCartItems}
                  </div>
                )}
                </div>
              </>
            ) : null}
          </div>

          <button onClick={toggleMenu} className="text-darkPrimary cursor-pointer focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 mt-3 space-y-2">
          <ul className="flex flex-col items-center gap-3">
            <li className="text-slate-500 hover:text-primary">
              <NavLink to={"/"} onClick={toggleMenu}>Home</NavLink>
            </li>
            <li className="text-slate-500 hover:text-primary">
              <NavLink to={"/products"} onClick={toggleMenu}>Products</NavLink>
            </li>
            <li className="text-slate-500 hover:text-primary">
              <NavLink to={"/categories"} onClick={toggleMenu}>Categories</NavLink>
            </li>
            <li className="text-slate-500 hover:text-primary">
              <NavLink to={"/brands"} onClick={toggleMenu}>Brands</NavLink>
            </li>
            {token && (
              <li className="text-slate-500 hover:text-primary">
                <NavLink to={"/allorders"} onClick={toggleMenu}>Orders</NavLink>
              </li>
            )}
          </ul>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-4">
            <a href="http://" target="_blank" rel="noreferrer" className="text-[#0866ff]">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="http://" target="_blank" rel="noreferrer" className="text-[#ff115b]">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="http://" target="_blank" rel="noreferrer" className="text-black">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="http://" target="_blank" rel="noreferrer" className="text-[#0a66c2]">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>

          {/* Auth Links */}
          <ul className="flex flex-col items-center gap-2 mt-4">
            {!token ? (
              <>
                <li className="text-slate-500">
                  <NavLink to={"/login"} onClick={toggleMenu}>Login</NavLink>
                </li>
                <li className="text-slate-500">
                  <NavLink to={"/register"} onClick={toggleMenu}>Register</NavLink>
                </li>
              </>
            ) : (
              <li className="text-slate-500 cursor-pointer" onClick={() => { logout(); toggleMenu(); }}>LogOut</li>
            )}
          </ul>

        </div>
      )}
    </nav>
  );
}
