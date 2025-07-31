import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "./AuthContext";


export const wishlistContext = createContext(null)











export default function WishlistContextProvider({ children }) {

    const {token} = useContext(authContext)
    
    let loadingToast;

    const [loading, setLoading] = useState(false);
    
    const [wishlist, setWishlist] = useState(null);

    async function getLoggedUserWishlist() {
        setLoading(true);
        try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: { token: localStorage.getItem('token') }
        });
        setWishlist(data);
        } catch (err) {
        console.log(err);
        } finally {
        setLoading(false);
        }
    }


    async function addProductToWishlist(productId) {
        loadingToast = toast.loading('Adding your product to wishlist...');
        try {
            await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, {
                headers: { token: localStorage.getItem('token') }
            });
            toast.success('Product added to wishlist successfully!');
            
        } catch (err) {
            console.log(err);
        } finally {
            toast.dismiss(loadingToast);
            await getLoggedUserWishlist();
        }
    }

    useEffect(() => {
        if(token){
            getLoggedUserWishlist();
        }else{
            setWishlist(null)
        }
    }, [token]);



    async function deleteProductFromWishlist(wishlistItemId) {
        loadingToast = toast.loading('Deleting your product...');
        try {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${wishlistItemId}`, {
            headers: { token: localStorage.getItem('token') }
        });
        toast.success('Product deleted successfully!');
        
    } catch (err) {
        console.log(err);
    } finally {
        toast.dismiss(loadingToast);
        await getLoggedUserWishlist();
    }
    }





    async function clearWishlist() {
        if (!wishlist?.data?.length) return;

        loadingToast = toast.loading('Clearing your wishlist...');
        try {
            await Promise.all(
            wishlist.data.map((item) =>
                axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${item.id}`, {
                headers: { token: localStorage.getItem('token') },
                })
            )
            );
            toast.success('All wishlist items removed');
            await getLoggedUserWishlist();
        } catch (err) {
            console.error(err);
            toast.error('Failed to clear wishlist');
        } finally {
            toast.dismiss(loadingToast);
        }
    }










    return (
    <wishlistContext.Provider value={{wishlist,addProductToWishlist, deleteProductFromWishlist,loading, getLoggedUserWishlist,clearWishlist}}>
      {children}
    </wishlistContext.Provider>
  )
}
