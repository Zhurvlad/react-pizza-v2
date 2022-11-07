import React from 'react';
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {filterSelector, setSearchValue} from "../../redux/slices/filterSlice";

export const Search:React.FC = () => {
    const {searchValue} = useSelector(filterSelector)
    const dispatch = useDispatch()


    const [value, setValue] = React.useState('')


    // Делаем отложенный поиск благодаря Debounce
    const debounceFn = React.useCallback(debounce((e:string) => dispatch(setSearchValue(e)), 1000), [])

    const inputRef = React.useRef<HTMLInputElement>(null)

   const onClearInput = () => {
       dispatch(setSearchValue(''))
       inputRef.current?.focus()
       setValue('')
   }

   //Создаём два инпута для того чтобы можно было пользоватся Debounce
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setValue(e.target.value)
        debounceFn(e.target.value)
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/>
                <g id="search">
                    <path
                        d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/>
                </g>
            </svg>
            <input ref={inputRef} value={value} onChange={(e) => handleChangeInput(e)}
                   className={styles.input} placeholder={'Давай поищем вместе бро...'}/>
            {searchValue &&  <svg onClick={onClearInput}
                                   className={styles.clear}
                                   viewBox="0 0 20 20"
                                   xmlns="http://www.w3.org/2000/svg">
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>}
        </div>
    );
};

