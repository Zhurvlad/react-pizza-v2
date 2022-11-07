import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addPizzaToCart, pizzaCountSelector} from "../../redux/slices/cartSlice";
import {Link} from "react-router-dom";
import {ICartItemProps} from "../../models/ICartItem";

export type PizzaBlockProps = {
    id: string,
    name: string,
    imageUrl: string,
    sizes: number[],
    types: number[],
    price: number
}

const availableTypes = ["тонкое", "традиционное"]

export const PizzaBlock:React.FC<PizzaBlockProps> = ({id, name, imageUrl, sizes, types, price}) => {

    const dispatch = useDispatch()
    const pizzaCount = useSelector(pizzaCountSelector(id))

    const [activeSize, setActiveSize] = React.useState(0)
    const [activeType, setActiveType] = React.useState(0)


    const onActiveSize = (i:number) => {
        setActiveSize(i)
    }

    const onActiveType = (i:number) => {
        setActiveType(i)
    }

    const addToCart = () => {
        const pizzaObj: ICartItemProps  = {
            id,
            name,
            imageUrl,
            sizes: sizes[activeSize],
            types: availableTypes[activeType],
            price,
            count: 0
        }

        dispatch(addPizzaToCart(pizzaObj))

    }

    return (

        <div className='pizza-block-wrapper'>
            <div className="pizza-block">
                <Link key={id} to={'/items/' + id}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{name}</h4>
                </Link>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((type, i) => (
                            <li key={i} onClick={() => onActiveType(i)}
                                className={`${activeType === i ? 'active' : ''}`}>{availableTypes[type]}</li>
                        ))}
                    </ul>
                    <ul>
                        {sizes && sizes.map((size, i) => (
                            <li key={size} onClick={() => onActiveSize(i)}
                                className={`${activeSize === i ? "active" : ''}`}>{size} см.</li>
                        ))}

                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <div onClick={addToCart} className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {pizzaCount?.count !== undefined && <i>{pizzaCount && pizzaCount.count}</i>}
                    </div>
                </div>
            </div>
        </div>
    )
}
