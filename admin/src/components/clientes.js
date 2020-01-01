import React, { useState } from 'react'
import NavbarTop from './navbar-top'
import NavbarLeft from './navbar-left'
import axios from 'axios'
import './styles/cliente.css'

const Clientes = (props) =>{

    const [clientes, setClientes] = useState([])

    axios.get('/cliente/get').then((res)=>{
        setClientes(res.data)
    })


   

    return (
        <div>
            <NavbarTop />
            <NavbarLeft active={'cliente'} />

            <div className="enc list_cl">

           
                <h1 className="title"> <img src="img/icons8_deliver_food_48px.png" alt="" /> Clientes <span>({clientes.length})</span> </h1>
                <table className="tableHead">
                    <thead>
                    <tr>
                        <th>NOME</th>
                        <th>TELEFONE</th>
                        <th>ENDEREÇO</th>
                        
                    </tr>
                    </thead>
                </table>

                {clientes.length !== 0  ? 

                <div>
                <table className="tableData">
                        <tbody>
                        {clientes.map((cliente, key)=>(

                            <tr key={key}>
                            <td><img src='/img/food_img/1.jpg' alt="" /> {cliente.nome}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.endereco}</td>
                           </tr>
                        ))}
                        </tbody>
                        
                        
                    </table>
                    </div>

                   : <h1 className="semVendas">Sem Clientes</h1>}

                </div>
        </div>
    )
}

export default Clientes