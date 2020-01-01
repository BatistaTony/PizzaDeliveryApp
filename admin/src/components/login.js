import React, {Component} from 'react'
import Auth from './auth'
import axios from 'axios'
import './styles/login.css'


const defaultState = {
    email: '',
    senha: '',
    emailError: '',
    senhaError: ''
}

const errorStyle ={
    color:'red',
    fontSize:'9pt',
    marginTop:'10px'
}


export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = defaultState 
    }

  
    handleChange = event => {

        this.setState({emailError: ''})
        this.setState({senhaError: ''})

        const isCheckbox = event.target.type === 'checkbox'

        this.setState({
            [event.target.name]: isCheckbox ?
            event.target.checked :
            event.target.value
        })
    }

    formValidation(error){

        if(error){

            if(error.includes("email")){
                this.setState({emailError: 'Verifica o campo de email !'})
            }

            if(error.includes("senha")){ 
                this.setState({senhaError: 'Verifica o campo de senha !'}) 
            }

            this.setState({senhaError: error})

        }

       
       

    }

    handleSubmit = e => {

        e.preventDefault()

        return Auth.login(()=>{
                   

                    axios.post('/user/admin/login', {
                        "email":this.state.email,
                        "senha":this.state.senha
                    }).then(res=>{
                        if(res.data.id){
                            Auth.authenticated = true
                            this.props.history.push('/app')
                        }else{

                              if(res.data.error){
                                    this.formValidation(res.data.error)
                                }
                                if(res.data.message){
                                        this.formValidation(res.data.message)
                                }
                       
                        }
                    })

                })

    }

    render(){

    return(

        <div className="Login">

            <div className="navbartop">
                <h1 className="logo">Fast Food</h1>
            </div>

        <div className="formLogin">
            
            <form onSubmit={this.handleSubmit}>

                <h1 className="lg_logo">OliveiraDaPizza</h1>
                
                <input
                    type="email"
                    name="email"
                    placeholder="Email do usuario"
                    onChange={this.handleChange}
                 />

                <h1 style={errorStyle}>{this.state.emailError}</h1>

                <input
                    type="password"
                    name="senha"
                    placeholder="senha do usuario"
                    onChange={this.handleChange}
                 />

                <h1 style={errorStyle}>{this.state.senhaError}</h1>

                <button type="submit">Login</button>


                </form>

            
            </div>
        </div>
        
        )}
}