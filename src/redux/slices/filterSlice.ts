import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {availableSortProps} from "../../components/Sort";

export enum AvailableSortEnum {
    POPULAR_DESC = 'popular',
    POPULAR_ASC = '-popular',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
}


interface filterSliceProps {
    searchValue: string,
    activeCategory: number,
    pageNumber: number,
    sortBy: availableSortProps
}

const initialState: filterSliceProps = {
    searchValue: '',
    activeCategory: 0,
    pageNumber: 1,
    sortBy: {name: 'популярности', sortProperty: AvailableSortEnum.POPULAR_DESC }
}

export const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        setActiveCategory(state, action: PayloadAction<number>) {
            state.activeCategory = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSortBy(state, action:PayloadAction<availableSortProps>) {
            state.sortBy = action.payload
        },
        setPageNumber(state, action:PayloadAction<number>){
            state.pageNumber = action.payload
        },
        setUrlPastParams(state, action: PayloadAction<any>){
            state.activeCategory = Number(action.payload.activeCategory)
            state.pageNumber = Number(action.payload.pageNumber)
            state.sortBy.sortProperty = action.payload.sortProperty
        }
    }
})

export const filterSelector = (state:RootState) => state.filter

export const {setActiveCategory, setSortBy, setPageNumber, setUrlPastParams, setSearchValue} = filterSlice.actions

export default filterSlice.reducer