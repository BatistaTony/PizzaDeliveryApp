import React, {useEffect, useState} from 'react'
import axios from 'axios'
import $ from 'jquery'
import { getOneFood, getFood } from './store/actions/food'
import { useDispatch } from 'react-redux'


const initialState = {
        _id: '',
        nome: '',
        sabores: '',
        tamanho: {
          familiar: {
            preco: 0
          },
          grande: {
            preco: 0
          },
          media: {
            preco: 0
          },
          broto: {
            preco: 0
          }
        },
        __v: 0
      }
    

export default function VerFood (props){

    const [pizza, setPizza] = useState(initialState)
    const dispatch = useDispatch()

    const hideFood = () => {
        $('.comida .viewFood').css({display: 'none'})
        dispatch(getOneFood(0))
    }


    const showFood = () => {
        $('.comida .viewFood').css({display: 'flex'})
    }

    const removerFood = () => {
        $('.dialogOverlay').css({display: 'flex'})
    }

    const hideRemoveFood = () => {
        $('.dialogOverlay').css({display: 'none'})
        dispatch(getOneFood(0))
        setPizza(props.food) 
    }

    useEffect(()=>{
        if(props.food){
           
            setPizza(props.food) 
            
           
        }else{
            console.log(props.id)
        }
    })
   

   
    const deleteOnePizza = (id)=>{
        axios.delete('/pizza/delete/'+pizza._id).then((res)=>{
            if(typeof(res.data.nome) !== 'undefined'){
                $('.verfood .dialogOverlaysucess').css({display: 'flex'})
                    dispatch(getFood())
            }else{
                
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

   
   
   
    return (

        <div className="viewFood">
        
      
        {typeof(pizza.nome) !== 'undefined' ?
        
            showFood()
        
         :null}

        <div className="verfood">

        <div className="dialogOverlaysucess">
            <div className="modal_sucess1">
                <h1>Pizza Removida com sucesso</h1>
                <button onClick={hideRemoveFood} className="btn_food btn_ok">Ok</button>
            </div>
        </div>


            <div className="dialogOverlay">
                <div className="dialogRemove">
                    <h1>Pretende remover a pizza ?</h1>
                    <button onClick={()=> deleteOnePizza(pizza.id)}>Sim</button>
                    <button onClick={hideRemoveFood}>Não</button> 
                </div>
            </div>

            

            <div className="title"> <h1> Pizza {pizza.nome}</h1> <button className="btn_close_verfood" onClick={()=>(hideFood())}>X</button></div>
                
                <div className="detalhes0">
                    <img src="img/food_img/1.jpg" alt="" />

                    <div className="detalhes">
                  
                  <h1>{pizza.nome}</h1>
                  <ul className="precos_pizza">
                      <li>Familiar: {pizza.tamanho.familiar.preco} kzs</li>
                      <li>Grande: {pizza.tamanho.grande.preco} kzs</li>
                      <li>Média: {pizza.tamanho.media.preco} kzs</li>
                      <li>Bróto: {pizza.tamanho.broto.preco} kzs</li>
                  </ul>

                    Sabores
                  <p>{pizza.sabores}</p>
                  
              </div>
                </div>
              
               

                <div className="opcoes">
                    <button onClick={removerFood} ><img src="/img/icons8_remove_50px_1.png" alt="" /></button>
                </div>

        </div>
        </div>
    )
    
}