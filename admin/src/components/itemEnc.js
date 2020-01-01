import React, {useState} from 'react'
import $ from 'jquery'
import { OPEN_CART, CONFIRM_CART, Cancelar } from './store/actions/cartActions'
import { useDispatch } from 'react-redux'

export default function ItemEncomenda(props){

    const dispatch = useDispatch()

    const [seeNota, setSee] = useState(false)
   

    const seeMore = (id) => {

        $('.'+id+' .content_nota').toggle()

        if(!seeNota){
           $('.btn_'+id).text("Ver Menos") 
           setSee(true)
        }else{
            $('.btn_'+id).text("Ver Mais")
            setSee(false)
        }
        

    }

    const cancelCart = (id,nome)=>{
        dispatch(Cancelar(id,'flex',nome))
    }

    

    return (

       

        <div className="nota">
 
               
                <div className={"nota_2 "+props.user._id}>
                    <div className="time_nota">
                        <h5 className="time_nota">Há 15 minutos atras</h5>
                    </div>
                    <div className="perfil_nota">


                            <img className="img_nota" src={'img/'+props.user.userObj.img} alt="" />

                            <div>
                                <h1>{props.user.userObj.nome}</h1>
                                <h3>{props.user.userObj.telefone}</h3>
                                <h4>{props.user.endereco}</h4>
                            </div>

                            
                        
                        </div>

                    <div className="content_nota">
                        <table className="tableHead">
                            <thead>
                                <tr>
                                    <th>Pizzas</th>
                                    <th>Tamanho</th>
                                    <th>Quantidade</th>
                                    <th>Preco</th>
                                    <th>Preco Total</th>
                                    <th>Sabores</th>
                                    
                                </tr>
                            </thead>
                        </table>
                       
                        <table className="tableData">
                                

                                {props.user.producto.map((pizza, key)=>(
                                    <tbody>
                                    <tr key={key}>
                                        <td><img src="img/food_img/1.jpg" alt="" /> {pizza.pizza.nome}</td>
                                        <td>{pizza.pizza.quantidade}</td>
                                        <td>{pizza.pizza.quantidade}</td>
                                        <td>{pizza.pizza.preco} kzs</td>
                                        <td>{pizza.pizza.preco_total} kzs</td>
                                        <td className="acrescimo">{pizza.pizza.sabores}</td>                           
                                    </tr>
                                    </tbody>
                                ))}
                            
                                
                            </table>
            
          
                        </div>

                </div>
                   

                    <div className="footer_nota">

                        <div className="nota_opc">
                            <button onClick={()=>{dispatch(CONFIRM_CART(props.user._id, 'flex', props.user.userObj.nome))}} >Confirmar</button>
                            <button onClick={()=>{dispatch(OPEN_CART(props.user._id,'flex', props.user.userObj.nome))}}>Abrir</button>
                            <button onClick={()=>cancelCart(props.user._id, props.user.userObj.nome)} >Cancelar</button>
                            </div>
                       
                       
                       <button onClick={()=>seeMore(props.user._id)}  className={"ver_nota btn_"+props.user._id}>Ver Mais</button>
                        </div>
                
                </div>

    )
}