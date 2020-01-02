import React from 'react'
import Navbar from './navbar'
import Pizzas from './pizzas'
import Rodape from './rodape'
import Estabelecimento from './estabelecimento'
import axios from 'axios'
import Auth from './auth'
import CartButton from './cart_button'
import { connect } from 'react-redux'

class Home extends React.Component {

    constructor(props){

        super(props)

        this.state = {
                psqnome: '',
                psqsabores: '',
                psqtipo: '',
                psqpreco: ''
            ,
            pizzas : [],
            numberofPizzas: 0,
            pizzasEnc : [],
        }

        
    }


    chooseSabor = (sb)=>{
        if(this.state.saboresEscolhidos !== sb){
            if(this.state.saboresEscolhidos){
                this.setState({saboresEscolhidos: this.state.saboresEscolhidos+','+ sb})
            }else{
                this.setState({saboresEscolhidos:sb})
            }
        }
    }

    searchPizza = () => {
        this.state.pizzas.map((pizza,key)=>{
            if(pizza.tamanho.broto.preco < this.state.psqpreco){
                this.setState({pizzasEnc: pizza})
                console.log(pizza)
            }
        })
    }

    handleChange = (event) =>{

        const isCheckbox = event.target.type === 'checkbox'
        
        this.setState({

            [event.target.name]: isCheckbox ?
            event.target.checked :
            event.target.value
        })

        

    }


    handleSubmitPizza = (event)=>{
        event.preventDefault()
       
    }

    componentDidMount(){
        axios.get('pizza/getAll').then((res)=>{
            if(res.data.pizzas){
                this.setState({pizzas: res.data.pizzas})
                
            }else{
                console.log(res.data.message)
            }
        }).catch((err)=>{
            if(err.response){
                if(err.response.status === 500){
                    this.setState({erro:'Erro interno do servidor'})
                }else{
                    this.setState({erro:'Erro de conexão'})
                }
            }
        })


    }

     getPizzasNumber = () => {

        if(this.props.state.User._id){
            
            axios.get('/cart/getCart/'+this.props.state.User._id).then((res)=>{

            this.setState({numberofPizzas: res.data.cart.producto.length})

            }).catch((err)=>{
                if(err.response){
                    if(err.response.status === 500){
                        this.setState({erro:'Erro interno do servidor'})
                    }else{
                        this.setState({erro:'Erro de conexão'})
                    }
                }
            })
        }
    }



    render(){
        return(
            <div className="home">

                    {this.getPizzasNumber()}
                    
                    {this.props.state.User._id && this.state.numberofPizzas ?
                        
                        <CartButton pizzas={this.state.numberofPizzas} />:
                        null
                    }

                <Navbar  item={'home'} />

                <div className="hero">

                    

                    <div className="hero_son">
                        <h1 className="title">Encomenda uma Pizza, e chegará rapído.</h1>
                        <p className="texto">
                        Quando começo a pensar em todas as pessoas às quais gostaria de expressar minha gratidão pela ajuda, sugestões e trabalho árduo para tornar este livro possível, a lista não pára de crescer. Primeiro, gostaria de agradecer à minha esposa e família, por criarem um ambiente onde pude deixar o fluxo criativo correr a qualquer hora do dia ou da noite, e onde minhas idéias eram recebidas por ouvidos compreensivos
                        </p>
                        
                        
                        <div className="sabores">
                        <h1>###################### ?</h1>
                                <button className="btn_hero" onClick={this.searchBySabores}>##########</button>
                            </div>
                    </div>

                    <div className="redes">
                        <ul>
                            <li><img src="./img/icons8_facebook_circled_filled_25px.png" alt="" /></li>
                            <li><img src="./img/icons8_facebook_circled_filled_25px.png" alt="" /></li>
                            <li><img src="./img/icons8_twitter_filled_25px.png" alt="" /></li>

                            </ul>
                    </div>

                    </div>


                    <div className="content">
                            
                            <div className="divsearch">
                                <form onSubmit={this.handleSubmitPizza}>
                                    
                                    <div>
                                        <h3>Sabores: </h3>
                    
                                        <input type="text" name="sabores"  onChange={this.handleChange} />

                                    </div>

                                    <div>
                                        <h3>Nome: </h3>
                                        <input type="text" name="psqnome"  onChange={this.handleChange} />

                                    </div>

                                    <div>
                                        <h3>Preço: </h3>
                                        <input type="number" name="psqpreco" onChange={this.handleChange} />

                                    </div>

                                    <div>
                                        <h3>Tipo: </h3>
                                        <select name="psqtipo"  onChange={this.handleChange}>
                                            <option>Normal</option>
                                            <option>Vegetariano</option>
                                        </select>

                                    </div>

                                    <button onClick={this.searchPizza} className="btn_hero btn_search">Pesquisar</button>
                                    


                                    </form>


                                </div>

                                
                                {this.state.pizzas[0]  ? 
                                        <div>                                       
                                            <Pizzas pizzas={this.state.pizzas} />
                                        </div>
                                : 
                                <div className="carrinho_no_user">

                                
            
                                <img src="img/icones/icons8_error_100px.png" alt="" />
            
                                
                                   <p className="texto">
                                   Sem pizzas, Problemas com a conexão com servidor ou  internet, Actualize a pagina ou tente mais tarde.
                                        </p>
            
                                  
            
                                </div>

                                }

                        </div>

                       

                        <Estabelecimento />

                    

                        <Rodape />

                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Home)