import {calcTotalPrice} from "./calcTotalPrice";
import {ICartItemProps} from "../models/ICartItem";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(items)

    return {
        items: items as ICartItemProps[],
        totalPrice
    }
}