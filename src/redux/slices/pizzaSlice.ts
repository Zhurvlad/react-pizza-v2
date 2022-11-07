import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {IFullPizza} from "../../models/IPizza";

export type urlParamsProps = {
    searchPizza: string,
    limit: number,
    categoryUrl: string,
    sortUrl: string,
    orderUrl: string,
    validPage: number
}

interface pizzaSliceProps {
    status: StatusEnum
    pizzas: IFullPizza[]
}

export enum StatusEnum {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export const fetchPizzas = createAsyncThunk<IFullPizza[],  urlParamsProps>(
    'pizza/fetchPizzas',

    async (params) => {
        const {searchPizza, limit, categoryUrl, sortUrl, orderUrl, validPage} = params
        const pizzaUrl = `https://635158fc3e9fa1244e5c5c47.mockapi.io/items?page=${validPage}&${searchPizza}&limit=${limit}&${categoryUrl}&sortBy=${sortUrl}&order=${orderUrl}`

       const {data} = await axios.get<IFullPizza[]>(`${pizzaUrl}`)
        return data
    }
)


const initialState: pizzaSliceProps = {
    pizzas: [],
    status: StatusEnum.LOADING
}

export const pizzaSlice = createSlice({
    name: 'pizzaSlice',
    initialState,
    reducers: {
        setPizzas (state, action: PayloadAction<IFullPizza[]>) {
            state.pizzas = action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchPizzas.pending ,(state) => {
                state.status = StatusEnum.LOADING
                state.pizzas = []
        })
            builder.addCase(fetchPizzas.fulfilled ,(state, action) => {
            state.pizzas = action.payload
            state.status = StatusEnum.SUCCESS
        })
            builder.addCase(fetchPizzas.rejected ,(state) => {
            state.status = StatusEnum.ERROR
            state.pizzas = []
        })
    }
})

export const pizzaSelectors = (state:RootState) => state.pizzas

export const {setPizzas} = pizzaSlice.actions

export default pizzaSlice.reducer