import React, {useEffect} from 'react'
import './styles/comida.css'
import VerFood from './verFood'
import NavbarLeft from './navbar-left'
import NavbarTop from './navbar-top'
import $ from 'jquery'
import { getFood, getOneFood, showEdit } from './store/actions/food'
import { useSelector, useDispatch } from 'react-redux'
import EditeFood from './editFood'

 var x = 0

export default function Comidas (){

    const pizzas  = useSelector(state=>state.getFood[0])
    const oneFood = useSelector(state=>state.OneFood.food)
    const foodToEdit = useSelector(state=>state.EditeFood.food)
    const dispatch = useDispatch()
    
    

    useEffect(()=>{
        if(x === 0){

            dispatch(getFood())

            x=x+1

        }else{

        }
    })

   

    const reduceNumber = (n)=>{
        if(n >= 1000 && n < 1000000){
            return (n/10000) + "k"
        }else{
            if(n >= 1000000){
                return (n/1000000) +"M"
            }else{
                return n
            }
        }
    }

    
    return(

        <div className="comida">

            
            <NavbarTop />
            <NavbarLeft  active="comidas" />

            {oneFood ? <VerFood  food={oneFood} /> :null}

            {foodToEdit ? <EditeFood /> :null}

            <div className="enc">
                <h1 className="title"> <img src="img/icons8_deliver_food_48px.png" alt="" /> Pizzas disponiveis <span></span> </h1>
                <table className="tableHead">
                    <thead>
                    <tr>
                        <th>Pizza</th>
                        <th>Tamanho</th>
                        <th>Preço</th>
                        <th>Sabores</th>
                        </tr>
                        </thead>
                </table>

                {pizzas ? 
                
                <table className="tableData">
                        <tbody>
                        {pizzas.map((pizza, key)=>(

                            <tr key={key}>
                                <td><img src="img/food_img/1.jpg" alt="" /> {pizza.nome}</td>
                                <td>Familíar, Grande, Média, Bróto</td>
                                <td>{reduceNumber(pizza.tamanho.familiar.preco)} kzs, {reduceNumber(pizza.tamanho.grande.preco)} kzs, {reduceNumber(pizza.tamanho.media.preco)} kzs, {reduceNumber(pizza.tamanho.broto.preco)} kzs</td>
                                <td>{pizza.sabores}</td>
                                <button className="btn_food btn_verfood" onClick={()=>dispatch(showEdit(pizza))} id="btn_food" >Editar</button>                              
                                <button className="btn_food btn_verfood" onClick={()=>dispatch(getOneFood(pizza))} id="btn_food" >Ver</button>                              
                            </tr>

                        ))}
                        </tbody>
                        
                        
                    </table>
            
            :

            <h1>Sem comida</h1>
            
            
            
            
            }
                
                </div>

            </div>
    )
                        
}