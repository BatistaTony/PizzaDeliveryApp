import React from 'react'



export  function EncomendasHoje(props){

 
    return(
        <div className="enc">

           
                <h1 className="title"> <img src="img/icons8_deliver_food_48px.png" alt="" /> Encomendas de Hoje <span>({props.encomendas.length})</span> </h1>
                <table className="tableHead">
                    <thead>
                    <tr>
                        <th>PIZZA</th>
                        <th>CLIENTE</th>
                        <th>TELEFONE</th>
                        <th>TIME</th>
                        <th>PARA</th>
                        <th>QTD PIZZAS</th>
                        <th>PREÇO TOTAL</th>
                        <th>STATUS</th>
                    </tr>
                    </thead>
                </table>

                {props.encomendas.length !== 0  ? 

                <div>
                <table className="tableData">
                        
                        {props.encomendas.map((cart, key)=>(

                            <tbody>
                                {new Date(cart.data_car).getDate() === new Date().getDate() ?

                            <tr key={key}>
                            <td><img src='/img/food_img/1.jpg' alt="" /> {cart.producto.length > 1 ? (cart.producto[0].pizza.nome+', ...'): (cart.producto[0].pizza.nome)}</td>
                            <td>{cart.userObj.nome}</td>
                            <td>{cart.userObj.telefone}</td>
                            <td>{new Date(cart.data_car).getFullYear()} - {new Date(cart.data_car).getDate()} - {new Date(cart.data_car).getUTCMonth()} | {new Date(cart.data_car).getUTCHours()}:{new Date(cart.data_car).getUTCMinutes()}</td>
                            <td>{cart.endereco}</td>
                            <td>{cart.quantidade_total}</td>
                            <td>{cart.preco_total} kzs</td>
                            <td  className="status"><span style={props.setColorBg(cart.status)}>{cart.status}</span></td>
                            
                            </tr>:null}
                            </tbody>

                        ))}
                        
                        
                    </table>
                    </div>

                   : <h1 className="semVendas">Sem Vendas</h1>}

                </div>
    )
}
