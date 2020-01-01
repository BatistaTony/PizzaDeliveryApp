import React, {useEffect} from 'react'
import NavbarLeft from './navbar-left'
import NavbarTop from './navbar-top'
import './styles/encomenda.css'
import ItemEncomenda from './itemEnc'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { GET_CARTS_NUMBER, GET_CARTS_PENDENTE, OPEN_CART, CONFIRM_CART, Cancelar } from './store/actions/cartActions' 


var x = 0

const Encomenda = () =>{


    const overlay = useSelector(state=>state.openCart)
    const numberOfCarts = useSelector(state=>state.Carrinho[0])
    const carts = useSelector(state=>state.carts[0])
    const cancelarCart = useSelector(state=>state.cancelarCart)
    const dispatch = useDispatch()
    const overlayConfirm = useSelector(state=>state.confirmCart)


   
    const hideAbrir = ()=>{
        dispatch(OPEN_CART('', 'none', ''))
        dispatch(CONFIRM_CART('', 'none', ''))   
    }

    const AbrirCart = ()=> {

        axios.post('/cart/openCart/'+overlay.id).then((res=>{

           
            dispatch(GET_CARTS_PENDENTE())
            dispatch(GET_CARTS_NUMBER())

            dispatch(OPEN_CART('', 'none', ''))

        })).catch(err=>(
            console.log(err)
        ))
       
    }

    const hideCancel = ()=>{
        dispatch(Cancelar(' ','none', ' '))
    }

    const confirmCart = ()=>{
        axios.post('/cart/confirmCart/'+overlayConfirm.id).then((res)=>{

            dispatch(GET_CARTS_PENDENTE())
            dispatch(GET_CARTS_NUMBER())
            dispatch(CONFIRM_CART('', 'none', ''))

        }).catch(err=>(
            console.log(err)
        ))
        
    }

    const CanCart = ()=>{
        axios.post('/cart/Cancel/'+cancelarCart.id)
        dispatch(Cancelar(' ','none', ' '))
    }

    
    
    
    useEffect(()=>{
        if(x === 0){
        dispatch(GET_CARTS_NUMBER())
        dispatch(GET_CARTS_PENDENTE())
            x =x+1
    }else{

        }
    })

  
    return(

        <div className="notif">

        {overlay.display === "flex" ?  

            <div className="overlay_abrir">
                    <div className="dialogAbrir">
                        <h1>Prente Abrir o carrinho do Sr. {overlay.nome} ?</h1>
                        <button onClick={hideAbrir}>NÃO</button>
                        <button onClick={AbrirCart}>SIM</button> 
                    </div>
                </div>

            :null} 

        {cancelarCart.display === "flex" ?  

        <div className="overlay_abrir">
                <div className="dialogAbrir">
                    <h1>Prente cancelar o carrinho do Sr. {cancelarCart.nome} ?</h1>
                    <button onClick={hideCancel}>NÃO</button>
                    <button onClick={CanCart}>SIM</button> 
                </div>
            </div>

        :null} 

            {overlayConfirm.display === "flex" ? 

            <div className="overlay_confirm">
                <div className="dialogConfirm">
                    <h1>A encomenda está preparada para ser entregada ao Sr {confirmCart.nome} ?</h1>
                    <button onClick={hideAbrir}>NÃO</button>
                    <button onClick={confirmCart}>SIM</button> 
                </div>
            </div>

            :null}

            <NavbarTop />
            <NavbarLeft active="encomenda"  not={numberOfCarts}  />

          
            
            <div className="notif_body">

            

                <h1 className="nota_title">Recents ({numberOfCarts})</h1>

                {numberOfCarts  ? 
                    <div className="div_content_enc">
                        {carts.map((nota, key)=>(
                            
                            <div>
                            {new Date(nota.data_car).getDate() === new Date().getDate() ?
                            <ItemEncomenda key={key} user={nota} /> :null}
                            </div>
                        ))}

                    </div>

                : <h1>SEM ENTREGAS HOJE ! </h1> }
                        

            </div> 

            </div>
    )

}


export default Encomenda