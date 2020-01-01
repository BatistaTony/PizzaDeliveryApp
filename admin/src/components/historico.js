import React from 'react'
import NavbarTop from './navbar-top'
import NavbarLeft from './navbar-left'
import axios from 'axios'

const initiaState = {
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
] 
}

class Historico  extends React.Component{

    state = initiaState

    componentDidMount(){

        axios.get('/cart/getCarts').then((res)=>{
            this.setState({entregas: res.data.cart})
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
            return        {backgroundColor:'rgb(2, 63, 71)'}
        
            default:
                break;
        }
    }

    render(){
        return (
            <div>
                <NavbarTop />
                <NavbarLeft active={'historico'} />
                
                <div className="data_historia">

                <h1 className="title_his">Historico de todas as vendas</h1>

                <div className="data">
                <table className="tableHead">
                <thead>
                    <tr>
                        <th>Food</th>
                        <th>Cliente</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th style={{width:'150px'}}>Data e Hora</th>
                        <th>Quantidade</th>
                        <th>Preço Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                </table>
                <table className="tableData">
                    <tbody>
                    {this.state.entregas.map((cart, key)=>(
                           <tr key={key}>
                                <td>{cart.length > 1 ? (this.state.singleEntrega.producto[0].pizza.nome+', ...'): (cart.producto[0].pizza.nome)}</td>
                                <td>{cart.userObj.nome}</td>
                                <td>{cart.userObj.telefone}</td>
                                <td>{cart.endereco}</td>
                                <td style={{width:'150px'}}>{new Date(cart.data_car).getFullYear()} - {new Date(cart.data_car).getDate()} - {new Date(cart.data_car).getUTCMonth()} | {new Date(cart.data_car).getUTCHours()}:{new Date(cart.data_car).getUTCMinutes()}</td>
                                <td>{cart.quantidade_total}</td>
                                <td>{cart.preco_total}</td>
                                <td  className="status"><span style={this.setColorBg(cart.status)}>{cart.status}</span></td>
                            </tr>  
                     ))}
                     </tbody>
                </table>
                </div>
                </div>



                </div>
        )
    }
}

export default Historico