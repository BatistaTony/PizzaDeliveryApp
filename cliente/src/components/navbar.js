import React, {useState} from 'react'
import './styles/navbar.css'
import {Link, Redirect} from 'react-router-dom'
import Auth from './auth'
import axios from 'axios'

export default function Navbar(props){

    const [nome, setNome] = useState('')


    const showUser = ()=>{
        axios.post('/cliente/getOne', {
            "id": Auth.showUser()
        }).then((res)=>{
            if(res.data){
                setNome(res.data.nome)
            }else{
                alert('Erro de conta')
            }
            
        }).catch((err)=>{
            if(err.response){
             
            }
        })

    }

    const logout = () =>{

         return (Auth.logout(()=>
             <Redirect to='/login' />
        ))
        
    }

    


    const isLogged = () => {

        if(Auth.islogged()){

            return (

                props.item === 'user' ? 

                    <Link to="user"  className="eu"><li className="act_item">Eu</li>
                
                            <ul className="submenuEu">
                                <li>{nome}</li>
                            <Link to="login"><li className="logout"  onClick={logout}>Sair</li></Link>
                            </ul>                 
                    
                    </Link>:
                    
                    <Link to="user"  className="eu"><li>Eu</li>
                  
                    <ul className="submenuEu">

                            <li>{nome}</li>
                            <li  className="logout" onClick={logout}>Sair</li>
                            </ul>
                 
                    </Link>
                
            )

        }else{


            return (

                props.item === 'user' ? 

                    <Link to="login"  className="eu"><li className="act_item">Conta</li>
                
                    </Link>:
                    
                    <Link to="login"  className="eu"><li>Conta</li>
                  
                 
                    </Link>
                
            )


        }
    }
  

    return (
        <div className="navbar">

       
            
        
        {showUser()}

            <div className="logo">
                <img src="img/icones/icons8_kawaii_pizza_48px.png" alt="" />
                <h1 > OliveiraDaPizza </h1>
            </div>
            <ul className="menu">

                {props.item === 'home' ? 
                    <Link to="/"><li className="act_item">Home</li></Link> :
                    <Link to="/"><li>Home</li></Link>
                }

                {props.item === 'carrinho' ? 
                    <Link to="carrinho"><li className="act_item">Carrinho</li></Link>:
                    <Link to="carrinho"><li>Carrinho</li></Link>
                }

                {isLogged()}
                
                
                {props.item === 'sobre' ?
                    <Link to="/sobre"><li className="act_item">Sobre</li></Link>:
                    <Link to="/sobre"><li>Sobre</li></Link>
                }
                


                </ul>
        </div>
    )
}