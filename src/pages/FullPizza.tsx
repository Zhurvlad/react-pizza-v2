import React from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {IFullPizza} from "../models/IPizza";



export const FullPizza:React.FC = () => {
    const [pizza, setPizza] = React.useState<IFullPizza>()
    const {id} = useParams()

    React.useEffect(() => {

        (async () =>  {
            const {data} = await axios.get('https://635158fc3e9fa1244e5c5c47.mockapi.io/items/'+id)

                setPizza(data)
            }
        )()
    }, [id])

    if(!pizza) {
        return <>'Загрузка...'</>
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} />
            <h2>{pizza.name}</h2>
            <h4>{pizza.price} ₽</h4>
            <Link to="/">
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    );
};

