import { createContext, useContext, useReducer } from "react";
import { wishlistReducer } from "../reducer"; // Ensure this import is correct

const initialValue = {
    wishlist: [] // ✅ Correct initialization
};

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
    const [{ wishlist }, wishlistDispatch] = useReducer(wishlistReducer, initialValue);

    return (
        <WishlistContext.Provider value={{ wishlist, wishlistDispatch }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Custom Hook
const useWishlist = () => useContext(WishlistContext);

export { useWishlist, WishlistProvider };
