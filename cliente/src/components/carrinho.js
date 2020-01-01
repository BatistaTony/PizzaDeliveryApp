import React from 'react'
import Navbar from './navbar'
import Rodape from './rodape'
import './styles/carrinho.css'
import Auth from './auth'
import {Link} from 'react-router-dom'
import axios from 'axios'
import $ from 'jquery'

export default class Carrinho extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            carrinho: '',
            idpizza: 0,
            total_cart: 0,
            frase: 'fghghfghfghfhf',
            qtd_total: 0
        }
    }


    componentDidMount(){

        if(Auth.islogged()){
            
            axios.get('/cart/getCart/'+Auth.showUser()).then((res)=>{

               this.setState({carrinho: res.data.cart})
               

               this.calc_cart_total()

               this.state.carrinho.producto.map((pizza)=>{
                   this.setState({qtd_total:pizza.pizza.quantidade + this.state.qtd_total})
               })

                
            }).catch((err)=>{
                if(err.response){
                   
                }
            })

        }



    

    }

    calc_cart_total = () => {
        this.state.carrinho.producto.map((pizza)=>{
            this.setState({total_cart: this.state.total_cart + Number(pizza.pizza.preco_total)})
        })
    }

    delete_of_cart = () =>{

        this.setState({total_cart:0})

        this.state.carrinho.producto.splice(this.state.idpizza, 1)

        axios.post('/cart/deletePizza/'+this.state.carrinho._id, {
            "producto": this.state.carrinho.producto
        }).then((res)=>{
            
            if(res.data.cart){

                $('.overlay_cart_sucess').css({display:'flex'})
                this.setState({frase: 'Pizza removida com sucesso'})                         
                this.calc_cart_total()

            }else{
                $('.overlay_cart_sucess').css({display:'flex'})
            }
            

        }).catch((err)=>{
            if(err.response){
               
            }
        })

        

    }

    closeCart = () => {
        axios.post('/cart/closeCart/'+this.state.carrinho._id, {
            "preco_total": this.state.total_cart, 
            "date": new Date(),
            "quantidade_total": this.state.qtd_total}).then((res)=>{
                
            if(res.data.cart){
                $('.overlay_cart_sucess').css({display:'flex'})
                this.setState({frase: 'Carrinho fechado com sucesso e chegará em breve.'})  
            }else{
                $('.overlay_cart_sucess').css({display:'flex'})
                this.setState({frase: 'Problemas ao fechar o carrinho.'})  
            }
        }).catch((err)=>{
            if(err.response){
               
            }
        })

        $('.overlay_cart_close_cart').css({display:'none'})
    }

    showCloseCart = () => {
        $('.overlay_cart_close_cart').css({display:'flex'})
    }


    showRemover = (id) =>{

        this.setState({idpizza: id})

        $('.overlay_cart').css({display:'flex'})


    }

    cancel = ()=>{
        $('.overlay_cart').css({display:'none'})
        $('.overlay_cart_sucess, .overlay_cart_close_cart').css({display:'none'})
        this.setState({idpizza: 0})
    }
    

    render(){
        return(
            <div className="carrinho">


                <Navbar item={'carrinho'} />

     
                <div className="overlay_cart">
                    <div className="div_confirm">
                        <h1>Pretende remover a pizza do carrinho ?</h1>

                        <div className="btns_cart_confirm">
                            <button onClick={this.delete_of_cart} className="btn_confirm_cart" >Sim</button>
                            <button onClick={this.cancel} className="btn_confirm_cart" >Não</button>
                        </div>

                        </div>
                </div>

                <div className="overlay_cart_close_cart">
                    <div className="div_confirm">
                        <h1>Pretende fechar o carrinho ?</h1>
                        <p>O carrinho uma vez fechado já não pode ser adicionado um outro producto enquanto a encomenda nn chegou.</p>
                        <div className="btns_cart_confirm">
                            <button onClick={this.closeCart} className="btn_confirm_cart" >Sim</button>
                            <button onClick={this.cancel} className="btn_confirm_cart" >Não</button>
                        </div>

                        </div>
                </div>

                <div className="overlay_cart_sucess">
                    <div className="div_confirm">

                    <img src="img/icones/icons8_checkmark_96px.png" alt="" />

                        <h1>{this.state.frase}</h1>

                        <div className="btns_cart_confirm">
                            <button onClick={this.cancel} className="btn_confirm_cart" >Ok</button>
                        </div>

                        </div>
                </div>


                <div className="carrinho1">
                
                {Auth.islogged() ? 
                
                <div className="carrinho1_2">

               
                {this.state.carrinho  ? 

                <div>
                    
                <h1 className="title"> <img src="img/icones/icons8_shopping_cart_60px_1.png" alt="" /> Carrinho  ({this.state.carrinho.producto.length}) </h1>


                <table className="tableHead">

                    <tr>

                        <th>Nome</th>
                        <th>Tamanho</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Preço Total</th>
                        <th>Sabores</th>
                        
                    </tr>

                </table>          
               
           
                <table className="tableData">
                       
                       {this.state.carrinho.producto.map((pizza, key)=>(

                            <tr>
                                <td title="Nome da pizza"><img src='img/pizza.jpg' alt="" /> {pizza.pizza.nome}</td>
                                <td title="Tamanho da pizza">{pizza.pizza.tamanho}</td>
                                <td title="Preço da pizza">{pizza.pizza.preco} kzs</td> 
                                <td title="Quantidade de pizzas">{pizza.pizza.quantidade}</td>
                                <td title="Preço total da pizza">{pizza.pizza.preco_total} kzs</td>
                                <td title="Sabores da pizza">{pizza.pizza.sabores}</td>
                                
                                {!this.state.carrinho.closed ?
                                    <button onClick={()=>{
                                        this.showRemover(key)
                                    }} className="btn_food btn_verfood" id="btn_food" >Remover</button>                              
                                :   null}
                                </tr>

                        ))}
                        
                </table>
                
                <div className="control_cart">
                    
                    {!this.state.carrinho.closed ?
                        <button onClick={this.showCloseCart} className="btn_hero" >Fechar o Cart</button>
                    : 
                        <div> 
                            {this.state.carrinho.status === "A caminho..." ?        
                                <button disabled style={{'background':'green',padding:'10px'}} className="btn_hero" >A caminho...</button>                 
                               : <button disabled style={{'background':'red'}} className="btn_hero" >Fechado</button>                 
                    }
                            </div>
                    }

                    <div className="cart_static_data">
                    <h1>TOTAL: {this.state.total_cart} kzs</h1>
                    <h1>STATUS: {this.state.carrinho.status}</h1>
                    {this.state.carrinho.closed ? 
                    <h1>Fechado as: {(this.state.carrinho.data_car).replace(/^[^:]*([0-2]\d:[0-5]\d).*$/,"$1")}</h1>
                    :
                    <h1>Criado as: {(this.state.carrinho.data_car).replace(/^[^:]*([0-2]\d:[0-5]\d).*$/,"$1")}</h1>   
                    }
                    </div>
                </div>

                <div className="cart_expl">
                    {this.state.carrinho.closed ? 
                        <p>Entraremos em contacto contigo para concluir o fechamento do carrinho e melhor esclarecimento do endereço para entrega da encomenda</p>
                    :null}
                </div>

                </div>            
                    
                :  
                            
                <div className="carrinho_no_user">

                    <img src="img/icones/icons8_crying_baby_96px.png" alt="" />

                    <h1>Carrinho vazio</h1>
                    
                       <p className="texto">
                            Adiciona um producto para criar o carrinho automaticamente.
                            </p>

                        <div className="btns_carrinho">               
                            <Link to="/"> <button className="btn_hero" >Add Producto</button></Link>
                        </div>

                    </div>
                    
                    }
                

                </div>

                :
               
                    <div className="carrinho_no_user">

                    <h1>Sem carrinho</h1>

                    <img src="img/icones/icons8_track_and_field_96px.png" alt="" />

                    
                       <p className="texto">
                            Você pricisa criar ou entrar na tua conta para fazer compras no sistema.
                            </p>

                        <div className="btns_carrinho">

                            
                        
                            <Link to="/user"> <button className="btn_hero" >Criar uma conta</button></Link>
                        </div>

                    </div>
                    
                }
                </div>

                <Rodape />
                </div>
        )
    }
}