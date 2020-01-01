const cart  = {
    display:'none',
    id: '',
    nome: ''
}



const cancelarCart = (state = cart, action)=>{
    if(action.type === "CANCELAR"){
        return {
            display: action.display,
            id: action.id,
            nome: action.nome
        }
    }else{
        return state
    }
}


export default cancelarCart