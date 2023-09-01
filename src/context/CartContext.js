import { createContext, useContext, useReducer } from "react"
import { cartReducers } from "../reducers";

const cartInitalState = {
    cartList: [],
    total: 0
}

const CartContext = createContext(cartInitalState);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducers, cartInitalState);

    function addToCart(product) {
        const updatedCartList = state.cartList.concat(product);
        const updatedTotal = state.total + product.price;
        dispatch({ type: "ADD_TO_CART", payload: { products: updatedCartList, total: updatedTotal } });
    }
    function removeFromCart(product) {
        const updatedCartList = state.cartList.filter(current => current.id !== product.id);
        const updatedTotal = state.total - product.price;
        dispatch({ type: "REMOVE_FROM_CART", payload: { products: updatedCartList, total: updatedTotal } });
    }
    function clearCart() {
        dispatch({ type: "CLEAR_CART" });
    }

    const value = {
        cartList: state.cartList,
        addToCart,
        removeFromCart,
        clearCart,
        total: state.total
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext);