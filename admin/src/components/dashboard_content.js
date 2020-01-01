import React, {Component} from 'react'
import './styles/main.css'
import axios from 'axios'
import Bloco from './estatistica'
import {EncomendasHoje} from './enco_ent'
 
export default class DashboardContent extends Component{

    state = {
        allfood: 0,
        encEntregas: 0,
        Encomedatotal: 0,
        encomedaPendente: 0

    }

     encomendas  = []
    
     componentDidMount(){

        
        this.getTotatEcnomedas()
        this.getCartsEntr()

                axios.get('/pizza/getAll').then((res)=>{
                    
                    if(res.data.pizzas.length !== this.state.allfood){

                        // console.log(res.data.pizzas.length)
                        this.setState({allfood: res.data.pizzas.length})
                    }
                    
                
                })
 
    }

    reduceNumber(n){
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

    getTotatEcnomedas = ()=>{
        axios.get('/Cart/getCartsToday').then((res)=>{ 
                res.data.cart.map((cart)=>{      

                    if(cart.closed){
                        this.setState({Encomedatotal: this.state.Encomedatotal + 1})
                        this.encomendas.push(cart)

                        if(cart.status === 'Pendente'){
                            this.setState({encomedaPendente: this.state.encomedaPendente + 1})
                        }
                    }

                    if(cart.entregado){
                        this.setState({EncomendasHoje: this.state.encEntregas  +1})
                    }
                })                         
        })
    }

    getCartsEntr = ()=>{
        axios.get('/cart/getCartsEntr').then((res)=>{
            this.setState({encEntregas:res.data.cart.length})
        })
    }

  
                   
     setColorBg = (status)=>{

        switch (status) {

            case 'Cancelada':
                return {backgroundColor:'red'}
                
            case 'A caminho...':
                    return {backgroundColor:'rgba(255, 145, 0, 0.945)'}
                
            case 'Entregada':
                return {backgroundColor:'green'}

            case 'Pendente': 
                return {backgroundColor:'rgb(2, 63, 71)'}
        
            default:
                break;
        }
    }

    render(){
    return(
        <div className="content-1">

            <h1 className="title_cont1">Dashboard</h1>

            <div className="statist">

                

                <Bloco
                 title={'Total de Pizzas'} 
                 img={'img/icons8_hamburger_50px.png'} 
                 number={this.reduceNumber(this.state.allfood)} 
                 link={'/comidas'}
                 />


                <Bloco
                 title={'Encomendas Total de Hoje'} 
                 img={'img/icons8_restaurant_table_48px.png'} 
                 number={this.reduceNumber(this.state.Encomedatotal)} 
                 link={'/'}
                 /> 
                 
                 <Bloco
                 title={'Encomendas Entregadas hoje'} 
                 img={'img/icons8_order_delivered_50px.png'} 
                 number={this.reduceNumber(this.state.encEntregas)} 
                 link={'/'}
                 />
                
                <Bloco
                 title={'Encomedas Pendentes'} 
                 img={'img/icons8_table_48px_2.png'} 
                 number={this.reduceNumber(this.state.encomedaPendente)} 
                 link={'/'}
                 />


            </div>

            <div className="reservas_1">

                <EncomendasHoje encomendas={this.encomendas} setColorBg={this.setColorBg} />
                

            </div>
               

            </div>
        )
    }
}