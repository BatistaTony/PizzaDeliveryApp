
const cart  = {
    display: 'none',
    id: '',
    nome: ''
}


const confirmCart = (state = cart, action)=>{
    
    if(action.type === "CONFIRM_CART"){
        return {
            display: action.display,
            id: action.id,
            nome: action.nome
        }
    }else{
        return state
    }
}

export default confirmCart