import React from 'react'

const availableCategories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

type CategoryProps = {
    activeCategory: number,
    onActiveCategory: (i: number) => void
}

export const Categories:React.FC<CategoryProps> = React.memo(({onActiveCategory, activeCategory}) => {

        return (
            <div className="categories">
                <ul>
                    {availableCategories.map((cat, i) => (
                        <li className={`${activeCategory === i ? "active" : ''}`} onClick={() => onActiveCategory(i)} key={cat}>{cat}</li>
                    ))}
                </ul>
            </div>
        )
    }
)