import React from 'react'
import './styles/pizza.css'
import axios from 'axios'
import Auth from './auth'
import $ from 'jquery'
import {Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Pizzas extends React.Component{

    constructor(props){
        super(props)

        this.state = {

            pizza: {
                "img": "",
                "nome": "",
                "sabores": "",
                "tipo": "",
                "tamanho": {
                    "familiar": {
                        "preco": 0 
                    },
                    "grande": {
                        "preco": 0 
                    },
                    "media": {
                        "preco": 0 
                    },
                    "broto": {
                        "preco": 0 
                    }
                }
            },
            tamanho: 'Brotó',
            preco: 0,
            quantidade: 1,
            preco_total: 0,
            endereco: '',
            numberofPizzas: 0,
            frase: ''
            
        }
    }

    increaseProd = ()=>{

        if(this.state.quantidade === 10 ){

        }else{

            this.setState({quantidade: this.state.quantidade + 1})

            this.setState({preco_total: (this.state.quantidade+1) * this.state.preco})

        }
    }

    

    decreaseProd = () =>{

        if(this.state.quantidade === 1 ){

        }else{
  
            this.setState({quantidade: this.state.quantidade - 1})
    
            this.setState({preco_total: (this.state.quantidade - 1) * this.state.preco})

            }
    }

    chooseSize = (e)=>{

        this.setState({tamanho: e.target.value})

        this.setState({quantidade: 1})
        this.setState({preco_total: this.state.preco})
        
       

            if(e.target.value === 'Familiar') {
                this.setState({preco: this.state.pizza.tamanho.familiar.preco})
                this.setState({preco_total: this.state.pizza.tamanho.familiar.preco})        
            }

            if(e.target.value === 'Grande') {
                this.setState({preco: this.state.pizza.tamanho.grande.preco})
                this.setState({preco_total: this.state.pizza.tamanho.grande.preco})  
             }

            if(e.target.value === 'Média') {
                this.setState({preco: this.state.pizza.tamanho.media.preco})
                this.setState({preco_total: this.state.pizza.tamanho.media.preco})  
            }

            if(e.target.value === 'Brotó') {
                 this.setState({preco: this.state.pizza.tamanho.broto.preco})
                 this.setState({preco_total: this.state.pizza.tamanho.broto.preco})  
            }

            
     

       }
        
    



    cancelar = ()=>{
        $('.overlay_add_prod').css({display:'none'})
        $('.overlay_add_prod_sucess').css({display:'none'})
        this.setState({quantidade: 1})
        this.setState({preco_total: 0})
    }

    add_tocart = (id)=>{
        

        if(this.props.state.User ){

            $('.overlay_add_prod_sucess').css({display:'flex'})
            this.setState({frase: 'Pizza adicionada no carrinho'})

            axios.post('/cart/postCart', {

                "userid":this.props.state.User._id,
                "producto": {
                    
                            "pizza": {

                                "id": this.state.pizza._id,
                                "nome": this.state.pizza.nome,
                                "preco": this.state.preco,
                                "sabores": this.state.pizza.sabores,
                                "tamanho": this.state.tamanho,
                                "quantidade": this.state.quantidade,
                                "preco_total": this.state.preco_total
                                
                            }
                        
                    },
                
                "endereco": this.state.endereco,
                "data_car": new Date()

            }).then((res)=>{
                
                if(typeof(res.data.closed) !== 'undefined'){
                    
                        if(res.data.closed){

                            $('.overlay_add_prod_sucess').css({display:'flex'})
                            this.setState({frase: 'Carrinho está fechado'})

                        }else{
                            if(res.data.message){
        
                                this.setState({frase: 'Erro ao adicionar a pizza no carrinho'})
                            }else{
                                this.setState({frase: 'Pizza adicionada no carrinho'})
                            }
                        }

                }else{
                    
                }

            }).catch((err)=>{
                this.setState({frase: 'Erro ao adicionar a pizza no carrinho'})
            })

        }else{

            $('.overlay_add_prod_sucess').css({display:'flex'})
            this.setState({frase: 'Precisa ter uma conta para fazer a encomenda'})
        }
        
    }

    GetAddress = (e) =>{
        this.setState({endereco: e.target.value})
    }

    getPizzasNumber = () => {

        if(Auth.islogged()){
            
            axios.get('/cart/getCart/'+this.props.state.User._id).then((res)=>{

            this.setState({numberofPizzas: res.data.cart.producto.length})

            }).catch((err)=>{
                
            })
        }
    }



    ShowForm = (id)=>{


        axios.get('/pizza/getOne/'+id).then((res)=>{

            this.setState({pizza: res.data.pizza})
            this.setState({preco: res.data.pizza.tamanho.broto.preco})
            this.setState({preco_total: this.state.preco})
            
        }).catch((err)=>{
            console.log(err)
        })


        $('.overlay_add_prod').css({display:'flex'})

        

    }

   
   render(){


    return (

        <div className="pizzas">

            {this.getPizzasNumber()}

            <div className="overlay_add_prod_sucess">
                <div className="div_sucess">

                    {this.state.frase.includes('Pizza') ? 

                    <img src="img/icones/icons8_checkmark_96px.png" alt="" />

                    : 
                    <div>

                        {this.state.frase.includes('fechado') ? 

                        <img src="img/icones/icons8_lock_48px.png" alt="" />

                        :<img src="img/icones/icons8_delete_96px.png" alt="" />}

                    </div>
                    }

                    <h1>{this.state.frase}</h1>

                    <div>
                    <button onClick={this.cancelar} className="add_pp" >Ok</button>
                    
                    {!this.props.state.User._id? 

                        <Link to="/user"><button className="add_pp" >Criar conta</button></Link>
                        :null}

                    </div>
                
                </div>
            </div>

            <div className="overlay_add_prod">

                    <div className="div_add_to_cart">
                        
                        <div className="op_pizza">
                            

                            <img className="img_p" src='./img/pizza.jpg' alt="" />

                           

                                <h1 className="title_p">{this.state.pizza.nome}</h1>

                                <p className="sabores_p">{this.state.pizza.sabores}</p>

                                 <div className="preco_p">
                                     <ul className="sizes_p">
                                            <li>Familiar: {this.state.pizza.tamanho.familiar.preco} kzs</li>
                                            <li>Grande: {this.state.pizza.tamanho.grande.preco} kzs</li>
                                            <li>Média: {this.state.pizza.tamanho.media.preco} kzs</li>
                                            <li>Brotó: {this.state.pizza.tamanho.broto.preco} kzs</li>
                                         </ul>
                                         <div>
                                    <h1>Preço: <span>{this.state.preco} kzs</span></h1>
                                    <h1>Total: <span>{this.state.preco_total}kzs</span></h1>
                                    </div>
                                </div>
                                    
                                    <div className="escolha_p">
                                    <div className="control_qtd_p">
                                        
                                        <button onClick={this.decreaseProd}>-</button>
                                        <h5>{this.state.quantidade}</h5>
                                        <button onClick={this.increaseProd}>+</button> 

                                    </div>

                                    <div className="tipo_p">
                                        <select onChange={this.chooseSize}>

                                            <option value="Brotó">Brotó</option>
                                            <option value="Média">Média</option>
                                            <option value="Grande">Grande</option>
                                            <option value="Familiar">Familiar</option>
                                            
                                            </select>

                                        </div>

                                      
                                    </div>

                                    {!this.state.numberofPizzas ?
                      
                                     <div className="div_end_add">
                                            <label htmlFor="enderco">Endereço(Opcional): </label>
                                                 <input type="text" onChange={this.GetAddress} id="endereco" placeholder="Endereço actual" />
                                    </div>:null}

                                    <div className="div_btns_add">
                                    <button onClick={()=>{this.add_tocart(this.state._id)}} className="add_pp">Add to cart</button>
                                    <button onClick={this.cancelar} className="add_pp">Cancelar</button>
                                    </div>
                                </div>
                    </div>

            </div>
                                    
        {this.props.pizzas.map((pizza, key)=>(  

            <div className="pizza" key={key}>

                        <img src='./img/pizza.jpg' alt="" />
                        <h1>{pizza.nome}</h1>
                        <h5 className="preco">{pizza.tamanho.broto.preco} kzs</h5>
                        <h5>{pizza.tipo}</h5>
                        <p className="details">Sabores: {pizza.sabores}</p>
                        <button onClick={()=>{
                            this.ShowForm(pizza._id)
                        }}>Add to cart</button>

            </div>

        ))}

        </div>

       
      
        
    )
        }
}

const mapStateToProps = state =>{
    return {
        state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(Pizzas)