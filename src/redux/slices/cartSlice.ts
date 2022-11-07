import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ICartItemProps } from '../../models/ICartItem'
import {RootState} from "../store";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";


export interface cartSliceProps {
    totalPrice: number,
    items: ICartItemProps[]
}

const {totalPrice, items} = getCartFromLS()

const initialState:cartSliceProps = {
    totalPrice: totalPrice,
    items: items
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addPizzaToCart(state, action: PayloadAction<ICartItemProps>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)

           if(findItem){
                findItem.count++
            } else {
               state.items.push({...action.payload,
               count: 1})
           }

            state.totalPrice = calcTotalPrice(state.items)
        },
        minusPizza(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)

            if(findItem){
                findItem.count--
            }
        },
        removePizza(state, action: PayloadAction<string>) {
            state.items.filter(obj => obj.id !== action.payload)
        },
        clearCart(state){
            state.items = []
            state.totalPrice = 0
        }

    }
})

//Бэст практис выносить статы в селекторы
export const cartSelector = (state: RootState) => state.cart
export const pizzaCountSelector = (id:string) => (state:RootState) => state.cart.items.find((obj) => obj.id === id)

export const {addPizzaToCart, removePizza, clearCart, minusPizza} = cartSlice.actions

export default cartSlice.reducer