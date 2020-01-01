import React from 'react'
import './styles/rodape.css'

export default function Rodape(){
    return(
        <div className="rodape">


                <div className="lojas">
                    <h1>Lojas</h1>
                    <ul>
                        <li>Luanda, Maianga, Mutumba, Rua 23</li>
                        <li>Luanda, Maianga, Mutumba, Rua 23</li>
                        <li>Luanda, Maianga, Mutumba, Rua 23</li>
                        </ul>
                    </div>

                <div className="rdp1">
                            <ul className="rdp_redes">
                                <li><img src="./img/icons8_facebook_circled_filled_25px.png" alt="" /></li>
                                <li><img src="./img/icons8_facebook_circled_filled_25px.png" alt="" /></li>
                                <li><img src="./img/icons8_twitter_filled_25px.png" alt="" /></li>
                            </ul>

                                <h4>CopryRight OliveiraDaPizza {new Date().getFullYear()}</h4>

                            <ul className="rdp_local">
                                <li><img src="./img/icones/icons8_marker_26px.png" alt="" /><span>Luanda</span></li>
                             </ul>

                            
                    </div>
        </div>
    )
}