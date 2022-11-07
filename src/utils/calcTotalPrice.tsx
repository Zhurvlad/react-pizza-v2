import {ICartItemProps} from "../models/ICartItem";

export const calcTotalPrice = (items: ICartItemProps[]) => {
    return items.reduce((sum, obj) =>(obj.price * obj.count) + sum, 0)
}