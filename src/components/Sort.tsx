import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AvailableSortEnum, filterSelector, setSortBy} from "../redux/slices/filterSlice";


export type availableSortProps = {
    name: string,
    sortProperty: AvailableSortEnum
}

type SortByProps = {
    sortBy: availableSortProps
}

export const availableSort: availableSortProps[] = [
    {name: "популярности(DESC)", sortProperty: AvailableSortEnum.POPULAR_DESC},
    {name: "популярности(ASC)", sortProperty: AvailableSortEnum.POPULAR_ASC},
    {name: "цене(DESC)", sortProperty: AvailableSortEnum.PRICE_DESC},
    {name: "цене(ASC)", sortProperty: AvailableSortEnum.PRICE_ASC},
    {name: "алфавиту(DESC)", sortProperty: AvailableSortEnum.TITLE_DESC},
    {name: "алфавиту(ASC)", sortProperty: AvailableSortEnum.TITLE_ASC}
]

export const Sort:React.FC<SortByProps> = React.memo(({sortBy}) => {

        const [visiblePopup, setVisiblePopup] = React.useState(false)
        const sortRef = React.useRef<HTMLDivElement>(null)
        const dispatch = useDispatch()


        const toggleVisiblePopup = () => {
            setVisiblePopup(!visiblePopup)
        }

        const onSortBy = (sortObj: availableSortProps) => {
            setVisiblePopup(false)
            dispatch(setSortBy(sortObj))
        }

        //Скрытие попап окна если клик происходит не в зоне попап окна
        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                //Типизация скрытия попапаесли клик был произведён вне области попапа
                const _event = event as MouseEvent & {
                    path: Node[]
                }

                if(sortRef.current && !_event.path.includes(sortRef.current)){
                    setVisiblePopup(false)
                }
            }
            document.body.addEventListener('click',handleClickOutside )

            //Удаляем листенер при переходе на другую страницу
            return () => {
                document.body.removeEventListener('click', handleClickOutside)
            }
        }, [])

        return (
            <div ref={sortRef} className="sort">
                <div className="sort__label">
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                    <b>Сортировка по:</b>
                    <span onClick={toggleVisiblePopup}>{sortBy.name}</span>
                </div>
                {visiblePopup && <div className="sort__popup">
                    <ul>
                        {availableSort.map((sortObj) => (
                            <li key={sortObj.name} onClick={() => onSortBy(sortObj)}
                                className={sortBy.sortProperty === sortObj.sortProperty ? 'active' : ''}>{sortObj.name}</li>
                        ))}
                    </ul>
                </div>}
            </div>
        )
    }
)