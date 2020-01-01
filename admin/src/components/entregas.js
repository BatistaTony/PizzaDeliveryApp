import React from 'react'

import NavbarLeft from './navbar-left'
import NavbarTop from './navbar-top'
import './styles/entregas.css'
import axios from 'axios'
import $ from 'jquery'

 
class Entrega  extends React.Component{

    constructor(props){
        super(props)

       
        this.state = {
            entregas: [ 
            { _id : '',
                producto : [
                    
                        {
                                pizza : {
                                        "id" : '',
                                        "nome" : '',
                                        "preco" : 0,
                                        "sabores" : '',
                                        "tamanho" : '',
                                        "quantidade" : 0,
                                        "preco_total" : 0
                                }
                        }
                ],
                status : '',
                entregado : 0,
                closed : 0,
                preco_total : 0,
                userid : '',
                endereco : '',
                userObj : {
                        "_id" :'',
                        "img" : '',
                        "nome" : '',
                        "telefone" : '',
                        "endereco" : '',
                        "senha" : '',
                },
                data_car : '',
                quantidade_total : 0
            }
        ],

            id_entre: '',
            singleEntrega: {_id : '',
            producto : [
                
                    {
                            pizza : {
                                    "id" : '',
                                    "nome" : '',
                                    "preco" : 0,
                                    "sabores" : '',
                                    "tamanho" : '',
                                    "quantidade" : 0,
                                    "preco_total" : 0
                            }
                    }
            ],
            status : '',
            entregado : 0,
            closed : 0,
            preco_total : 0,
            userid : '',
            endereco : '',
            userObj : {
                    "_id" :'',
                    "img" : '',
                    "nome" : '',
                    "telefone" : '',
                    "endereco" : '',
                    "senha" : '',
            },
            data_car : '',
            quantidade_total : 0 }
        }
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
            return        {backgroundColor:'rgb(2, 63, 71)'}
        
            default:
                break;
        }
    }

    getEntrega(cart,key){ 
     
        this.setState({singleEntrega: cart})

        // $('.item_'+key).click(()=>{
            $('.list_ent li').css("border-right","hidden")
            $('.item_'+key).css("border-right","3px solid rgba(255, 145, 0, 0.945)")
        // })
    
    }

    componentDidMount(){
        axios.get('/Cart/getCartsAC').then((res)=>{ 
                    this.setState({entregas: res.data.cart}) 
                    this.setState({singleEntrega: this.state.entregas[0]})
                    $('.item_0').css("border-right","3px solid rgba(255, 145, 0, 0.945)")

        })

    }

    cartEntre = ()=>{
        axios.get('/cart/Entregado/'+this.state.singleEntrega._id).then((res)=>{
            $('.overlay_entregado').css({display:'none'})
            axios.get('/Cart/getCartsAC').then((res)=>{ 
                this.setState({entregas: res.data.cart}) 
                this.setState({singleEntrega: this.state.entregas[0]})
    })
        }).catch((err)=>{
            console.log(err)
        })
    }

    CanCart = ()=>{

        axios.post('/cart/Cancel/'+this.state.singleEntrega._id)
        $('.overlay_cancel').css({display:'none'})
         axios.get('/Cart/getCartsAC').then((res)=>{ 
                    this.setState({entregas: res.data.cart}) 
                    this.setState({singleEntrega: this.state.entregas[0]})
        })

    }

    hideCancel = ()=>{
        $('.overlay_cancel').css({display:'none'})     
        $('.overlay_entregado').css({display:'none'})
    }

    shoCartCancel = ()=>{
        $('.overlay_cancel').css({display:'flex'})
    }

    shoCartEntr = ()=>{
        $('.overlay_entregado').css({display:'flex'})
    }

    


    render(){
    return(
        <div className="entregas">
            <NavbarTop />
            <NavbarLeft  active={'entregas'}/>

           
           {this.state.singleEntrega ?
            <div style={{display:'none'}} className="overlay_abrir overlay_cancel">
                    <div className="dialogAbrir">
                        <h1>Prente cancelar o carrinho do Sr. {this.state.singleEntrega.userObj.nome} ?</h1>
                        <button onClick={this.hideCancel}>NÃO</button>
                        <button onClick={this.CanCart}>SIM</button> 
                    </div>
                </div>
            :null}

            {this.state.singleEntrega ?
            <div style={{display:'none'}} className="overlay_abrir overlay_entregado">
                    <div className="dialogAbrir">
                        <h1>O carrinho do  Sr. {this.state.singleEntrega.userObj.nome} foi entregado com sucesso ?</h1>
                        <button onClick={this.hideCancel}>NÃO</button>
                        <button onClick={this.cartEntre}>SIM</button> 
                    </div>
                </div>
            :null}

            {typeof(this.state.singleEntrega) !== 'undefined' ? 

            <div className="content_ent">

                <div className="list_ent">
                            <ul>

                                {this.state.entregas.map((ent, key)=>(
                                    <li className={"item_"+key} key={key} onClick={()=>(this.getEntrega(ent,key))}>

                                        <img src={'img/'+ent.userObj.img} alt="" />
                                        <span>{ent.userObj.nome}</span>
                                    
                                    </li>
                                ))}
                                
                                </ul>
                </div>
                
                <div className="data_ent">

                    <div className="data">
                    <table className="tableHead">
                    <thead>
                    <tr>
                        <th>Food</th>
                        <th>Cliente</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Quantidade</th>
                        <th>Preço Total</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                </table>
                <table className="tableData">
                        
                          
                                <tbody>
                                <tr>
                                    <td>{this.state.singleEntrega.producto.length > 1 ? (this.state.singleEntrega.producto[0].pizza.nome+', ...'): (this.state.singleEntrega.producto[0].pizza.nome)}</td>
                                    <td>{this.state.singleEntrega.userObj.nome}</td>
                                    <td>{this.state.singleEntrega.userObj.telefone}</td>
                                    <td>{this.state.singleEntrega.endereco}</td>
                                    <td>{this.state.singleEntrega.quantidade_total}</td>
                                    <td>{this.state.singleEntrega.preco_total}</td>
                                    <td  className="status"><span style={this.setColorBg(this.state.singleEntrega.status)}>{this.state.singleEntrega.status}</span></td>
                                    
                                   
                                </tr> 
                                </tbody>

                                <div className="div_btns_entr_">
                                        <td><button onClick={this.shoCartEntr} className="btn_entre">Entregar  </button></td>  
                                        <td><button onClick={this.shoCartCancel} className="btn_entre btn_entre_1">Cancelar  </button></td>  
                                </div>
                        
                    </table>
                        </div>
                    
                    <div className="mapa">
                        
                        GOOGLE MAPS

                        </div>

                </div>

                
                </div>

                : <h1 className="SemEntrega">Sem Entregas a decorrer</h1>}
            
            </div>
    )
}

}


export default Entrega