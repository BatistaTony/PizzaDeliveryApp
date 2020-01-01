import React from 'react'
import './styles/estab.css'

export default function Estabelecimento (props){
    return (
        <div className="estab">

                <h1>O nosso espaço</h1>

                <ul className="galeria">
                    <li className="small" style={{'background-image':" url('img/IMG_2916.jpg')"}}></li>
                    <li className="large" style={{'background-image':" url('img/IMG_2914.jpg')"}}></li>
                    <li className="large" style={{'background-image':" url('img/IMG_2922.jpg')"}}></li>
                    <li className="small" style={{'background-image':" url('img/IMG_2923.jpg')"}}></li>
                </ul>

                <div className="howwork">

                   

                    <ul>
                        <li>
                            <img src="img/icones/icons8_shopping_cart_with_money_100px.png" alt="" />
                            <h1>Como comprar ?</h1>
                            <p>Quando começo a pensar em todas as pessoas às quais gostaria de expressar minha gratidão pela ajuda, sugestões </p>
                        </li>

                        <li>
                            <img src="img/icones/icons8_crowd_100px.png" alt="" />
                            <h1>Nós</h1>
                            <p>Quando começo a pensar em todas as pessoas às quais gostaria de expressar minha gratidão pela ajuda, sugestões </p>
                        </li>

                        <li>
                            <img src="img/icones/icons8_truck_100px.png" alt="" />
                            <h1>Como a Pizza chega a ti ?</h1>
                            <p>Quando começo a pensar em todas as pessoas às quais gostaria de expressar minha gratidão pela ajuda, sugestões </p>
                        </li>

                        <li>
                            <img src="img/icones/icons8_card_payment_100px.png" alt="" />
                            <h1>Formas de Pagamentos</h1>
                            <p>Quando começo a pensar em todas as pessoas às quais gostaria de expressar minha gratidão pela ajuda, sugestões </p>
                        </li>


                 </ul>
                </div>

            </div>
    )
}