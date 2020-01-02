import React from 'react'
import './styles/conta.css'
import Navbar from './navbar'
import Rodape from './rodape'
import $ from 'jquery'
import axios from 'axios'
import Auth from './auth'
import { connect } from 'react-redux'
import { getUser } from './store/actions'

const initialState = {   

                nome: '',
                endereco: '',
                telefone: '',
                senha: '',
                erro: ''   

        }

class Login extends React.Component { 

        constructor(props){
            super(props)
            this.state = initialState

            this.status_server_code = 0

        }
        


    componentDidMount(){
        
        $('.cadastro_form').css({display:'none'})

        $('.btn_cadastro').on('click', ()=>{

            $('.login_form').css({display:'none'})
            $('.cadastro_form').css({display:'flex'})
            $('.cadastro_form')[0].reset()
            
            this.setState(initialState)
        })

        $('.btn_login').on('click', ()=>{
            $('.cadastro_form').css({display:'none'})
            $('.login_form').css({display:'flex'})

            this.setState(initialState)

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

    handleSubmitRegister = e => {

        e.preventDefault()

        axios.post('/cliente/register', {
            "nome":this.state.nome,
            "telefone": this.state.telefone,
            endereco: this.state.endereco,
            senha: this.state.senha
        }).then((res)=>{
            if(res.data.cliente){
               
                    this.props.history.push('/')
                    this.props.dispatch(getUser(res.data.cliente))
               
            }else{
                this.setState({erro: res.data.message})
            }

        }).catch((err)=>{
            if(err.response.status === 500){
                this.setState({erro:'Erro interno do servidor'})
            }else{
                this.setState({erro:'Erro de conexão'})
            }
        })

    }

    handleSubmitLogin = (event) =>{

        event.preventDefault()
     
        axios.post('/cliente/login', {
                "telefone":this.state.telefone,
                "senha":this.state.senha
        }).then((res)=>{
            if(res.data.cliente){
                        this.props.history.push('/')
                        this.props.dispatch(getUser(res.data.cliente))          
            }else{
                    this.setState({erro: res.data.message})
            }

            
            
        }).catch((err)=>{
            if(err.response.status === 500){
                this.setState({erro:'Erro interno do servidor'})
            }else{
                this.setState({erro:'Erro de conexão'})
            }

        })

    }

    render(){
      
    return(
        
        <div className="login">

            {!Auth.islogged ?  this.props.history.push('/user'): null}


            <Navbar item={'user'} />
            <div className="overlay">
            <div className="div_login">
                                             
                            <form className="cadastro_form" onSubmit={this.handleSubmitRegister}>

                                <h1>Cadastrar</h1>

                                {
                                
                                this.state.erro ? 

                                    <div className="erro_style">
                                        <h4>{this.state.erro}</h4>
                                    </div>:null

                                }

                                <div className="ipt">
                                    <label htmlFor="nome">Nome</label>
                                    <input id="nome" type="text" onChange={this.handleChange} name="nome"/>
                                </div>
                                
                                <div className="ipt">
                                    <label htmlFor="tel">Telefone</label>
                                    <input id="tel" type="number" onChange={this.handleChange} name="telefone"  />
                                </div>

                                <div className="ipt">
                                    <label htmlFor="end">Endereço</label>
                                    <input id="end"  type="text" onChange={this.handleChange} name="endereco"  />
                                </div>

                                <div className="ipt">
                                    <label htmlFor="senha">Senha:</label>
                                    <input id="senha"  type="password" onChange={this.handleChange} name="senha" />
                                </div>

                                <div className="div_btns">
                                    <button type="submit" className="btn_up">Cadastrar</button>
                                    <h1 className="btn_up btn_cancel btn_login">Já tenho uma conta</h1>
                                </div>

                                </form>

                                
                                <form className="login_form" onSubmit={this.handleSubmitLogin}>

                                <h1>Login</h1>

                                {this.state.erro ? 

                                    <div className="erro_style">
                                        <h4>{this.state.erro}</h4>
                                    </div>:null
                                }
                                
                                <div className="ipt">
                                    <label htmlFor="ltel">Telefone</label>
                                    <input id="ltel" type="number" name="telefone" onChange={this.handleChange}  />
                                </div>

                                <div className="ipt">
                                    <label htmlFor="lsenha">Senha:</label>
                                    <input id="lsenha"  type="password" name="senha" onChange={this.handleChange} />
                                </div>

                                <div className="div_btns">
                                    <button type="submit" className="btn_up">Login</button>

                                    <h1 className="btn_up btn_cancel btn_cadastro">Criar conta</h1>

                                </div>

                                </form>

                            </div>

                        </div>

            <Rodape />
            </div>
    )
    }
}


const mapStateToProps = state =>{
    return {
        state
    }
}

const mapDispatchToProps  = dispatch => {
    return {
        dispatch
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)