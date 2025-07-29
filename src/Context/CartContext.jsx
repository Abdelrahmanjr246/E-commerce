import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "./AuthContext";

export const cartContext = createContext(null);

export default function CartContextProvider({ children }) {
  
  const { token } = useContext(authContext);

  let loadingToast;
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function getLoggedUserCart() {
    setLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { token: localStorage.getItem('token') }
      });
      setCart(data); // ✅ use data directly
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function addProductToCart(productId) {
    loadingToast = toast.loading('Adding your product to cart...');
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, {
        headers: { token: localStorage.getItem('token') }
      });
      toast.success('Product added to cart successfully!');
      setCart(data); // ✅ use data directly
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function deleteProductFromCart(cartItemId) {
    loadingToast = toast.loading('Deleting your product...');
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`, {
        headers: { token: localStorage.getItem('token') }
      });
      toast.success('Product deleted successfully!');
      if (data?.numOfCartItems === 0) {
      setCart(null); // 🛠️ Explicitly clear cart when last item deleted
    } else {
      setCart(data);
    }
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function clearCart() {
    try {
      const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { token: localStorage.getItem('token') }
      });
      toast.success('All products cleared from cart!');
      setCart(data); // ✅ use data directly
    } catch (err) {
      console.log(err);
    }
  }

  async function updateCartProduct(count, productId) {
    loadingToast = toast.loading('Updating cart...');
    setDisabled(true);
    try {
      const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, {
        headers: { token: localStorage.getItem('token') }
      });
      // Dynamic toast message
      if (count === 0) {
        toast.success('Product removed from cart!');
      } else {
        toast.success(`You have ${count} pieces${count > 1 ? 's' : ''} in your cart now`);
      }
      setCart(data); // ✅ use data directly
    } catch (err) {
      console.log(err);
    } finally {
      setDisabled(false);
      toast.dismiss(loadingToast);
    }
  }

  useEffect(() => {
    if(token)
      getLoggedUserCart();
  }, [token]);

  return (
    <cartContext.Provider value={{
      cart,
      disabled,
      getLoggedUserCart,
      addProductToCart,
      loading,
      deleteProductFromCart,
      clearCart,
      updateCartProduct
    }}>
      {children}
    </cartContext.Provider>
  );
}
