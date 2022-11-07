import React from 'react';
import {Routes, Route} from 'react-router-dom';
// import {Cart} from './pages/Cart';
import {Home} from './pages/Home';
import {NotFound} from './pages/NotFound';
import './scss/app.scss';
import {FullPizza} from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/'./pages/Cart'))

function App() {

    return (

            <Routes>
                <Route path='/' element={<MainLayout/>}>
                    <Route path="" element={<Home />}/>
                    <Route path="cart" element={<React.Suspense fallback={<div>Загрузка идёт</div>}>
                        <Cart/>
                    </React.Suspense>}/>
                    <Route path="items/:id" element={<FullPizza/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Route>
            </Routes>

    )
}

export default App;
