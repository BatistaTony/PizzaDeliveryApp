import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


export default function CartButton(props){
    return (

        <div className="cart_button">
            
            <h1 className="legend_cart_btn">{props.pizzas}</h1>
            <Link to="/carrinho"><button><img src="img/icones/icons8_shopping_cart_60px_1.png" alt="" /></button></Link>
        </div>

    )
}