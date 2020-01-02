import React, {useState} from 'react'
import Navbar from './navbar'
import Rodape from './rodape'
import Estabelecimento from './estabelecimento'
import './styles/sobre.css'
import CartButton from './cart_button'
import Auth from './auth'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Sobre(){

    const [number, setNumber] = useState('')
    const user  = useSelector(state=>state.User)

    const getPizzasNumber = () => {

        if(user){
            
            axios.get('/cart/getCart/'+user._id).then((res)=>{

            setNumber(res.data.cart.producto.length)

            }).catch(err=>
                    console.log(err)
                )
        }
    }

    return(
        
        <div className="sobre">

                {getPizzasNumber()}
                    
                    {user && number ?
                        
                        <CartButton pizzas={number} />:
                        null
                    }
                    

            <Navbar item={'sobre'} />

            <div className="sobrenos">

                <h1>OliveiraDaPizza</h1>
                
                <ul>
                    <li>
                        <h1 className="title">Quem somos nós ?</h1>
                        <p className="texto">
                        Quando começo a pensar em todas as pessoas às quais gostaria de expressar minha gratidão pela ajuda, sugestões e trabalho árduo para tornar este livro possível, a lista não pára de crescer. Primeiro, gostaria de agradecer à minha esposa e família, por criarem um ambiente onde pude deixar o fluxo criativo correr a qualquer hora do dia ou da noite, e onde minhas idéias eram recebidas por ouvidos compreensivos
                        </p>
                    </li>

                    <li>
                        <h1 className="title">Quem somos nós ?</h1>
                        <p className="texto">
                        Quando começo a pensar em todas as pessoas às quais gostaria de expressar minha gratidão pela ajuda, sugestões e trabalho árduo para tornar este livro possível, a lista não pára de crescer. Primeiro, gostaria de agradecer à minha esposa e família, por criarem um ambiente onde pude deixar o fluxo criativo correr a qualquer hora do dia ou da noite, e onde minhas idéias eram recebidas por ouvidos compreensivos
                        </p>
                    </li>

                    <li>
                        <h1 className="title">Quem somos nós ?</h1>
                        <p className="texto">
                        Quando começo a pensar em todas as pessoas às quais gostaria de expressar minha gratidão pela ajuda, sugestões e trabalho árduo para tornar este livro possível, a lista não pára de crescer. Primeiro, gostaria de agradecer à minha esposa e família, por criarem um ambiente onde pude deixar o fluxo criativo correr a qualquer hora do dia ou da noite, e onde minhas idéias eram recebidas por ouvidos compreensivos
                        </p>
                    </li>
                    
                    </ul>

                </div>

            <Estabelecimento />

            <Rodape />

            </div>
    )
}