"use client"

import { createContext, useContext, useState } from "react"

// ---- What one item looks like in the cart -----
type CartItem = {
    id: string
    title: string
    price: number
    quantity: number
}

// ----- What the Cart looks like itself ----
type CartContextType = {
    cartItems: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: string) => void
    cartCount: number
    cartTotal: number
}

// ---- the backpack ----
const CartContext = createContext<CartContextType | null>(null)

// ---- the backpack provider ----
export function CartProvider({ children }: { children: React.ReactNode }) {
    
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    // ---- add book to cart ----
    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === item.id)
            if(existing){
                // ---- book already in cart - just increase quantity
                return prev.map((i) => 
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
            }
            // ---- brand new item, add it in the cart ----
            return [ ...prev, item]
        })
    }

    // ---- remove book from tha cart ----
    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((i) => i.id !== id))
    }

    // ---- total number of items in the cart ----
    const cartCount = cartItems.reduce((total, i) => total + i.quantity, 0)

    // ---- total price of everything in the cart ----

    const cartTotal = cartItems.reduce((total, i) => total + i.price * i.quantity, 0)

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    )
}

// ---- hook to grab cart anywhere ----
export function useCart(){
    const context = useContext(CartContext)
    if(!context) throw new Error("useCart must be used inside CartProvider")
    return context    
}