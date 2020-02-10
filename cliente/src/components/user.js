import React from 'react'
import Navbar from './navbar'
import Rodape from './rodape'
import './styles/user.css'
import $ from 'jquery'
import Auth  from './auth'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import CartButton from './cart_button'
import { connect } from 'react-redux'


class User extends React.Component{

    constructor(props){

        super(props)

        this.state = {
            img: '',
            _id: '',
            nome: '',
            telefone: '',
            endereco: '',
            erro: '',
            file: null
            
        };
        
        this.confirmsenha = ''
        this.numberofpizzas = 0
    }

    getPizzasNumber = () => {

        if(this.props.state.User._id){
            
            axios.get('/cart/getCart/'+this.props.state.User._id).then((res)=>{

            this.numberofpizzas =  res.data.cart.producto.length

            }).catch((err)=>{
                if(err.response){
                    if(err.response.status === 500){
                        this.setState({erro:'Erro interno do servidor'})
                    }else{
                        this.setState({erro:'Erro de conexão'})
                    }
                }

            })
        }
    }

    close_upload = ()=>{
        $('.overlay_upload').css({display: 'none'})
        this.setState({erro: ''})
        this.setState({file:null})
        this.receiveUser()
    }

    show_upload = ()=>{
        $('.overlay_upload').css({display: 'flex'})
    }

    onGetImg = (e)=>{
        this.setState({file: e.target.files[0]})
    }

    uploadPhoto = ()=>{


        const fd = new FormData()

        fd.append('myimage', this.state.file)

        const config = {
            header: {
                'content-Type': 'multipart/form-data'
            }
        }

    
        if(this.state.file.type === "image/jpeg" || this.state.file.type === "image/png"){

            if((this.state.file.size / 1000) < 1000 ){

            axios.post('/cliente/uploadPhoto/'+this.state._id, fd, config).then((res)=>{

                    if(res.data.file.myimage === 'null'){
                        this.setState({erro: 'Imagem vazia'})
                    }else{
                        this.setState({erro: 'Upload feito com sucesso'})
                    }

                    
            }).catch(err=> console.log(err))
        }else{
            this.setState({erro: 'Tamanho da imagem muito grande'})

        }

        }else{
            this.setState({erro: 'Apenas imagem do tipo JPG e PNG'})
        }

    }

    

    receiveUser = () =>{

        axios.post('/cliente/getOne', {
            "id":this.props.state.User._id
        }).then((res)=>{

            if(res.data){

                this.setState(res.data) 
    
            }else{
                alert('Erro de conta')
            }
        }).catch((err)=>{
            if(err.response.status === 500){
                this.setState({erro:'Erro interno do servidor'})
            }else{
                this.setState({erro:'Erro de conexão'})
            }
        })


    }

    componentDidMount(){

        $('.btn_editar').on('click', ()=>{
            $('.perfil').css({display: 'none'})
            $('.div_edit').css({display: 'flex'})
        })



        $('.btn_cancel').on('click', ()=>{

            $('.perfil').css({display: 'flex'})
            $('.div_edit').css({display: 'none'})

            $('.erro_style h4').css({'background-color': 'green'})
            this.setState({erro: ''})
            this.confirmsenha = ''
            $('#senha').val('')

        })

        this.receiveUser()

        this.getPizzasNumber()

       
    }

    handleChange = (event) =>{
          
        const isCheckbox = [event.target.type] === 'checkbox'

        this.setState({
            [event.target.name]: isCheckbox ?
            event.target.checked :
            event.target.value
        })

    }

    handleSenha = (e)=>{
        this.confirmsenha = e.target.value
    }



    handleSubmit = (event) =>{
        event.preventDefault()
    }

    handleForm = (event) =>{
        
        if(this.state.nome === '' || this.state.telefone === '' || this.state.endereco === '' || this.confirmsenha === ''){
            if(this.confirmsenha === ''){
                $('.erro_style h4').css({'background-color': 'red'})
                this.setState({erro: 'Confirme os dados com a senha'})
            }
            else{
                $('.erro_style h4').css({'background-color': 'red'})
                this.setState({erro: 'Um ou mais campos estão vazios'})
            }
        }else{
            axios.patch('/cliente/update', {
                "id":this.state._id,
                "senha": this.confirmsenha,
                "nome": this.state.nome,
                "telefone": ""+this.state.telefone,
                "endereco": this.state.endereco
            }).then((res)=>{
                    if(res.data.message){
                        $('.erro_style h4').css({'background-color': 'red'})
                        this.setState({erro: res.data.message})
                    }else{
                        $('.erro_style h4').css({'background-color': 'green'})
                       this.setState({erro: 'Dadaos actualizado'})
                       this.confirmsenha = ''
                       $('#senha').val('')
                    }
            })
        }

    }

   

    render(){
        return(
            <div className="user">
                    
                    {this.props.state.User && this.numberofpizzas ?
                        
                        <CartButton pizzas={this.numberofpizzas} />:
                        null
                    }

                {!this.props.state.User ? <Redirect to='login' /> : null}

                    <Navbar item={'user'} />

                    <div className="cardUser">
                        <div className="overlay">

                        <div className="perfil">
                        
                        

                            <div className="foto_perfil">


                              <img className="foto" src={'./img/avatar/'+this.state.img} alt="" />

                                <div className="perfil_nome">
                                    <h1>{this.state.nome}</h1>
                                    <h3>{this.state.telefone}</h3>
                                    <button onClick={this.show_upload} className="btn_upload_img"><img className="" src="img/icones/icons8_plus_math_30px_1.png" alt="" />Upload a photo</button>
                                </div>

                                


                            </div>

                            <div className="inform">

                                        <img className="" src="img/icones/icons8_marker_50px.png" alt="" />                            
                                        <h1>{this.state.endereco}</h1>
                                    
                                </div>

                                <div className="div_btn">
                                        
                                        <button className="btn_editar">Editar</button>
                                </div>

                            </div>

                            <div className="div_edit">
                            <form onSubmit={this.handleSubmit}>

                                <h1>Actualizar o perfil</h1>

                                {this.state.erro ? 

                                <div className="erro_style">
                                    <h4>{this.state.erro}</h4>
                                </div>:null

                                }

                                <div className="ipt">
                                    <label htmlFor="nome">Nome</label>
                                    <input id="nome" type="text" name="nome" onChange={this.handleChange} value={this.state.nome} />
                                </div>
                                
                                <div className="ipt">
                                    <label for="tel">Telefone</label>
                                    <input id="tel" type="number" name="telefone"  onChange={this.handleChange} value={this.state.telefone} />
                                </div>

                                <div className="ipt">
                                    <label for="end">Endereço</label>
                                    <input id="end"  type="text" name="endereco" onChange={this.handleChange} value={this.state.endereco} />
                                </div>

                                <div className="ipt">
                                    <label for="senha">Digite a senha para certificar:</label>
                                    <input id="senha"  type="password" onChange={this.handleSenha} name="confirmsenha" />
                                </div>

                                <div className="div_btns">
                                    <button type="submit" className="btn_up" onClick={this.handleForm}>Actualizar</button>
                                    <button className="btn_up btn_cancel">Cancelar</button>
                                </div>

                                </form>
                            </div>

                        </div>

                        <div className="overlay_upload">
                                <div className="div_upload">
                                    {this.state.erro ? 
                                    <h3>{this.state.erro}</h3>:null}
                                    <form onSubmit={this.handleSubmit}>
                                        <h1>Adicionar uma foto</h1>
                                        <label htmlFor="file"><img src="img/icones/icons8_photo_gallery_64px.png" alt="" /></label>
                                        <input id="file" onChange={this.onGetImg} type="file" />
                                        <button onClick={this.uploadPhoto} className="btn_upl">Upload</button>
                                        <button onClick={this.close_upload} className="btn_upl">Cancelar</button>
                                        </form>
                                    </div>
                            </div>


                        


                    </div>
                    
                    <Rodape />
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}


const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(User)