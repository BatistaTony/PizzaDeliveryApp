import React from 'react'
import {Link} from 'react-router-dom'


export default function Bloco (props){
    return (
        
        <div className="statist_des">
            <img src={props.img} alt="" />
            <h1>{props.title}</h1>
            <h3>{props.number}</h3>
            <Link to={props.link}>Ver</Link>
        </div>
    )
}