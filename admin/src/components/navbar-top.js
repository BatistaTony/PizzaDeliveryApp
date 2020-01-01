import React from 'react'
import './styles/navbar.css'
import axios from 'axios'
import $ from 'jquery'
import { getFood } from './store/actions/food'
import { connect } from 'react-redux'

const initialState =  {
    nome: '',
    pfamiliar: 0,
    pgrande: 0,
    pmedia:0,
    pbroto: 0,
    sabores: '',
    erro: ''
 
}


 class NavbarTop extends React.Component{ 

     handleSearch = (event)=>{
        event.preventDefault()
    }

    state = initialState

   

    cleanState(){
        this.setState(initialState)
    }

  

    handleSubmit = (event) => {

        event.preventDefault()

        if(this.state.nome === "" || this.state.pfamiliar === 0 || this.state.pgrande === 0 || this.state.pmedia === 0  || this.state.pbroto === 0 || this.state.sabores === "" ){
            this.setState({erro: 'VAZIOS'})  
        }else{

            if(this.state.sabores.length > 50){
                this.setState({erro: 'SABORES'})  
 
            }else {
             
                axios.post('/pizza/register', {
            
                "nome": this.state.nome,
                "tamanho": {
                    familiar: {
                        preco: this.state.pfamiliar
                    },
                    grande: {
                        preco: this.state.pgrande
                    },
                    media: {
                        preco: this.state.pmedia
                    },
                    broto: {
                        preco: this.state.pbroto
                    }
                },
                "sabores":  this.state.sabores,
                
        
           }).then((res)=>{
               if(res.data.message){

                   this.setState({erro: res.data.message})
                   console.log(res.data)   

               }else{
                  this.setState({styleSuc: 'block'})
                   this.cleanState()
                   this.props.dispatch(getFood())
               }
           })}

        }

        
        
    }

    handleChange = (event) => {

        this.setState({erro: ''})
        
        const isCheckbox = event.target.type === 'checkbox'

        this.setState({
            [event.target.name]: isCheckbox ?
            event.target.checked :
            event.target.value
        })
    }

    handleCategoria = (event) => {
        this.setState({categoria: event.target.value})
    }

    cancel = (event) => {
        event.preventDefault()
        this.cleanState()
    }

    componentDidMount(){

        $('.cancel').click(()=>{

            $("#erroFood").text(' ')
            $("#formAddfood")[0].reset()
            $('.overlay').css({display:'none'})
    
        })
    
        $('.btn_ok').click(()=>{
            
            $("#formAddfood")[0].reset()
            $("#erroFood").text(' ') 
            $('.overlay, .overlay2, .modal_sucess').css({display:'none'})
    
        })
    
        
    
        $('.btn_add').click(()=>{
    
            $("#formAddfood")[0].reset()
            $('.overlay').css({display:'block'})
            
        })

    }


    render(){
    return(
        <div className="navbartop">
            <h1 className="logo">OliveiraDaPizza</h1>

                <button className="btn_add"><img src="img/icons8_plus_math_26px.png" alt="Add Food" /><span> ADD FOOD</span></button>
            
                <div className="overlay">

<div style={{display: this.state.styleSuc}} className="overlay2"></div>
    <div  style={{display: this.state.styleSuc}} className="modal_sucess">
        <img src="img/icons8_ok_48px.png"  alt="" />
        <h1>Comida cadastrada com sucesso</h1>
        <button onClick={this.cancel} className="btn_food btn_ok">Ok</button>
    </div>

    <div className="add_food">
        
        <form method="POST" id="formAddfood" onSubmit={this.handleSubmit}>
            <h1 className="title_Add_food">Add uma Pizza</h1>
         
            <div className="inputsForm">

            <div className="ipts">
                    <h5>Nome: </h5>
                    <input type="text" placeholder="nome do prato" id="ipt"  onChange={this.handleChange} name="nome" />
            </div>
            
           

            <div className="ipts">
                <h5>Preço Familiar: </h5>
                <input type="number" id="ipt" placeholder="Preço do tamanho Familiar"  onChange={this.handleChange} name="pfamiliar" />
                </div>

                <div className="ipts">
                <h5>Preço Grande: </h5>
                <input type="number" id="ipt" placeholder="Preço do tamanho Grande"  onChange={this.handleChange} name="pgrande" />
                </div>

                <div className="ipts">
                <h5>Preço Média: </h5>
                <input type="number" id="ipt" placeholder="Preço do tamanho Média"  onChange={this.handleChange} name="pmedia" />
                </div>

                <div className="ipts">
                <h5>Preço Bróto: </h5>
                <input type="number" id="ipt" placeholder="Preço do tamanho Bróto"  onChange={this.handleChange} name="pbroto" />
                </div>
            
            <div className="ipts">
                <h5>Sabores: </h5>
                <textarea name="sabores" id="ipt" placeholder="Sabores da pizza (50 caractres apenas)"  onChange={this.handleChange} ></textarea>
            </div>

           

            </div>

            {this.state.erro ? 
                <div>
                    {this.state.erro.includes('VAZIOS') ? 
                    <h1 id="erroFood">UM OU MAIS CAMPOS ESTÃO VAZIOS !</h1>: null}

                    {this.state.erro.includes('SABORES') ? 
                    <h1 id="erroFood">CAMPO DE SBORES ACEITA APENAS 50 CARACTERES</h1>: null}
                    
                    {this.state.erro.includes('NOME') ? 
                             <h1 id="erroFood">Nome da Pizza ja existe</h1>: null}
                    }

                </div>
        
            :null}

           
            
            
            <div className="btns_add">

                <button className="btn_food cancel" onClick={this.cancel}>Cancelar</button>
                <button className="btn_food"  type="submit">Add</button>

            </div>
       

            </form>

       


        
         </div>
</div>

            </div>
    )
    }
}

export default connect()(NavbarTop)