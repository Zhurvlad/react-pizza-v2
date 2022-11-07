import React from 'react'
import {Categories} from '../components/Categories'
import {PizzaBlock, } from '../components/PizzaBlock'
import {Skeleton} from '../components/PizzaBlock/Skeleton'
import {availableSort,  Sort} from '../components/Sort'
import Paginaton from "../components/Paginaton";
import {useSelector} from "react-redux";
import {
    filterSelector,
    setActiveCategory,
    setPageNumber,
    setUrlPastParams
} from "../redux/slices/filterSlice";
import qs from 'qs'
import {useNavigate} from "react-router-dom";
import {fetchPizzas, pizzaSelectors,} from "../redux/slices/pizzaSlice";
import {useAppDispatch} from "../redux/store";


export const Home: React.FC = () => {
    const navigate = useNavigate()
    const isSearch = React.useRef(false)
    const isUrl = React.useRef(false)
    const dispatch = useAppDispatch()

    // const [pizzas, setPizzas] = React.useState([])
    // const [isLoading, setIsLoading] = React.useState(false)
    // const [activeCategory, setActiveCategory] = React.useState(0)
    // const [sortBy, setSortBy] = React.useState({name: 'популярности', sortProperty: 'popular'})
    const limit = 4
    // const [pageNumber, setPageNumber] = React.useState(1)

    const {sortBy, activeCategory, pageNumber, searchValue} = useSelector(filterSelector)
    const {pizzas, status} = useSelector(pizzaSelectors)

    const onActiveCategory = React.useCallback((i: number) =>
            dispatch(setActiveCategory(i)),
        [])

    const onSetPageNumber = (event: number) => {
        dispatch(setPageNumber(event))
    }


    const fetchPizza = async () => {
        const categoryUrl = activeCategory <= 0 ? '' : `category=${activeCategory}`
        const sortUrl = sortBy.sortProperty.replace('-', '')
        const orderUrl = sortBy.sortProperty.includes('-') ? 'asc' : 'desc'
        const searchPizza = !searchValue ? '' : `search=${searchValue.toUpperCase()}`
        const validPage = pageNumber > 1 && activeCategory > 0 ? 1 : pageNumber


        dispatch(fetchPizzas({searchPizza, limit, categoryUrl, sortUrl, orderUrl, validPage}))

        console.log(sortUrl)
    }



    // //Если был первый рендер, то проверяе URL - параметры и сохраняем в редаксе
    // React.useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1))
    //
    //         const sort = availableSort.find(sortObj => sortObj.sortProperty === params.sortBy)
    //
    //
    //
    //
    //         dispatch(setUrlPastParams({
    //                ...params,
    //             // @ts-ignore
    //                sort
    //            }))
    //
    //
    //         isSearch.current = true
    //     }
    // }, [])

    //Если был первый рендер запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            (fetchPizza())
        }

        isSearch.current = false


    }, [sortBy.sortProperty, activeCategory, pageNumber, searchValue])


    // //Если изменили параметры и был первый рендер
    // React.useEffect(() => {
    //     if (isUrl.current) {
    //         const querystr = qs.stringify({
    //             sortProperty: sortBy.sortProperty,
    //             activeCategory,
    //             pageNumber
    //         })
    //
    //         navigate(`?${querystr}`)
    //     }
    //
    //     isUrl.current = true
    //
    // }, [sortBy, activeCategory, pageNumber])


    const pizza = pizzas.map((pizza: any) =>

        <PizzaBlock key={pizza.id} {...pizza}/>
    )
    const skeleton = [...new Array(16)].map((_, i) => <Skeleton key={i}/>)

    return (
        <>
            <div className='container'>
                <div className="content__top">
                    <Categories onActiveCategory={onActiveCategory} activeCategory={activeCategory}/>
                    <Sort sortBy={sortBy}/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {status === 'success'
                        ?
                        pizza
                        : skeleton
                    }
                </div>
                {activeCategory === 0 ? <Paginaton onSetPageNumber={onSetPageNumber} pageNumber={pageNumber}/> : ''}
            </div>
        </>
    )
}
