import React, {useEffect} from 'react'
import './styles/navbar.css'
import  {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GET_CARTS_NUMBER, GET_CARTS_PENDENTE } from './store/actions/cartActions'

 var x = 0 
 
export default function NavbarLeft(props){

    const numberOfEnc = useSelector(state=>state.Carrinho[0])
    const dispatch = useDispatch()
    const numberOfEncEn = useSelector(state=>state.cartOntheway[0])

   


    useEffect(()=>{
        if(x === 0){
        dispatch(GET_CARTS_PENDENTE())
        dispatch(GET_CARTS_NUMBER())
        x = x+1
        }else{

        }
    })
    
    return(
        <div className="navbarleft">

            <div className="menu">
                
                <ul className="menu_list">

                    {props.active === 'home'? 
                                            <Link to="/app"><li className="home act_item"><img src="img/icons8_combo_chart_26px.png" alt="" /> Dashboard</li></Link>
                    :

                    <Link to="/app"><li><img src="img/icons8_combo_chart_26px.png" alt="" /> Dashboard</li></Link>

                    }

                    {props.active === 'encomenda'? 

                        <Link to="/encomenda"><li className="notif act_item" ><img src="img/icons8_new_post_26px.png" alt="" />Encomendas {numberOfEnc !== 0 ? <span>{numberOfEnc}</span>: null} </li></Link>
                        :

                        <Link to="/encomenda"><li className="notif" ><img src="img/icons8_new_post_26px.png" alt="" />Encomendas {numberOfEnc !== 0 ? <span>{numberOfEnc}</span>: null} </li></Link>

                    }

                    {props.active === 'entregas'? 

                        <Link to="/entregas"><li  className="entre act_item"><img src="img/icons8_delivery_filled_50px.png" alt="" />Entregas  {numberOfEncEn !== 0 ? <span>{numberOfEncEn}</span>: null}</li></Link>
                        :

                        <Link to="/entregas"><li  className="entre"><img src="img/icons8_delivery_filled_50px.png" alt="" />Entregas {numberOfEncEn !== 0 ? <span>{numberOfEncEn}</span>: null}</li></Link>

                    }

                    {props.active === 'comidas'? 

                        <Link to="/comidas"><li  className="comidas act_item"><img src="img/icons8_food_26px.png" alt="" />Comidas</li></Link>
                        :

                        <Link to="/comidas"><li  className="comidas"><img src="img/icons8_food_26px.png" alt="" />Comidas</li></Link>

                    }

                    {props.active === 'cliente'? 

                    <Link to="/clientes"><li  className="comidas act_item"><img src="img/icons8_customer_26px.png" alt="" />Clientes</li></Link>
                    :

                    <Link to="/clientes"><li  className="comidas"><img src="img/icons8_customer_26px.png" alt="" />Clientes</li></Link>

                    }

                    {props.active === 'historico'? 

                    <Link to="/historico"><li  className="comidas act_item"><img src="img/icons8_order_history_26px.png" alt="" />Historico</li></Link>
                    :

                    <Link to="/historico"><li  className="comidas"><img src="img/icons8_order_history_26px.png" alt="" />Historico</li></Link>

                    }

                    <Link to="/"><li><img src="img/icons8_shutdown_26px.png" alt="" />Sair</li></Link>
                    
                    </ul>

                </div>


            </div>
    )
}