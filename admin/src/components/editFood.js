import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { showEdit, getFood } from './store/actions/food'
import $ from 'jquery'

const initialState =  {
    nome: '',
    pfamiliar: 0,
    pgrande: 0,
    pmedia:0,
    pbroto: 0,
    sabores: '',
    erro: ''
}

class EditeFood extends React.Component {

    constructor(props){
        super(props)
        this.state=  initialState
    }

    erroOrSucees = ()=>{

        var erro = this.state.erro
        
        if(erro !== 'ADICIONADA COM SUCESSO'){
           
             return 'red'  
                 
        }
    }

    componentDidMount(){

        this.setState(this.props.state.EditeFood.food)
        this.setState({pfamiliar: this.props.state.EditeFood.food.tamanho.familiar.preco})
        this.setState({pmedia: this.props.state.EditeFood.food.tamanho.media.preco})
        this.setState({pgrande: this.props.state.EditeFood.food.tamanho.grande.preco})
        this.setState({pbroto: this.props.state.EditeFood.food.tamanho.broto.preco})

    }

    handleSubmit = (event) => {

        event.preventDefault()

        if(this.state.nome === "" || this.state.pfamiliar === 0 || this.state.pgrande === 0 || this.state.pmedia === 0  || this.state.pbroto === 0 || this.state.sabores === "" ){
            this.setState({erro: 'UM OU MAIS CAMPOS ESTÃO VAZIOS'})
            
        }else{

            if(this.state.sabores.length > 50){
                this.setState({erro: 'SABORES'})  
 
            }else {

           axios.post('/pizza/update', {
            "id": this.state._id,
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
               if(res.data.message.includes('sucesso')){
                    console.log(res.data.message)
                    $('.overlay2').css({display: 'flex'})
                    this.props.dispatch(getFood())
               }else{

                   this.cleanState()

               }
           }).catch(err=>(
               console.log(err)
           ))


        }
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
        this.props.dispatch(showEdit(0))
    }



    render(){
        return(

           <div className="edit_food_">

            <div className="overlay2">

                <div className="modal_sucess">
                    <img src="img/icons8_ok_48px.png"  alt="" />
                    <h1>Pizza Actualizada com sucesso</h1>
                    <button onClick={this.cancel} className="btn_food btn_ok">Ok</button>
                </div>
                
            </div>

                <div className="add_food edit_food">
                    
                    <form method="POST" id="formAddfood" onSubmit={this.handleSubmit}>
                        <h1 className="title_Add_food">Actualizar o prato</h1>
                     
                     
                        <div className="inputsForm">

                                    <div className="ipts">
                                            <h5>Nome: </h5>
                                            <input type="text" value={this.state.nome} placeholder="nome do prato" id="ipt"  onChange={this.handleChange} name="nome" />
                                    </div>
                                    
                                

                                    <div className="ipts">
                                        <h5>Preço Familiar: </h5>
                                        <input type="number" id="ipt" value={this.state.pfamiliar} placeholder="Preço do tamanho Familiar"  onChange={this.handleChange} name="pfamiliar" />
                                        </div>

                                        <div className="ipts">
                                        <h5>Preço Grande: </h5>
                                        <input type="number" id="ipt" value={this.state.pgrande} placeholder="Preço do tamanho Grande"  onChange={this.handleChange} name="pgrande" />
                                        </div>

                                        <div className="ipts">
                                        <h5>Preço Média: </h5>
                                        <input type="number" id="ipt" value={this.state.pmedia} placeholder="Preço do tamanho Média"  onChange={this.handleChange} name="pmedia" />
                                        </div>

                                        <div className="ipts">
                                        <h5>Preço Bróto: </h5>
                                        <input type="number" id="ipt" value={this.state.pbroto} placeholder="Preço do tamanho Bróto"  onChange={this.handleChange} name="pbroto" />
                                        </div>
                                    
                                    <div className="ipts">
                                        <h5>Sabores: </h5>
                                        <textarea name="sabores" value={this.state.sabores} id="ipt" placeholder="Sabores da pizza (50 caractres apenas)"  onChange={this.handleChange} ></textarea>
                                    </div>

                                

                        </div>

                            {this.state.erro ? 
                                <div>
                                    {this.state.erro.includes('VAZIOS') ? 
                                    <h1 id="erroFood">UM OU MAIS CAMPOS ESTÃO VAZIOS !</h1>: null}

                                    {this.state.erro.includes('SABORES') ? 
                                    <h1 id="erroFood">CAMPO DE SBORES ACEITA APENAS 50 CARACTERES</h1>: null}

                                </div>
                        
                            :null}

           
            
            
                    <div className="btns_add">

                        <button className="btn_food cancel" onClick={this.cancel}>Cancelar</button>
                        <button className="btn_food"  type="submit">Actualizar</button>

                    </div>
            
                   

                        </form>

                   
                    </div>
                        </div>

        )
    }
}


function mapStateToProps(state){
    return {
        state
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    }
}



export default  connect(mapStateToProps, mapDispatchToProps)(EditeFood)