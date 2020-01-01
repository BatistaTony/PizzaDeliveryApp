
const cart = { 
    display:'none',
    id: '',
    nome: ''
}

const openCart  = (state = cart, action,nome)=>{

    if(action.type === "OPEN_CART"){
        return {
            display:action.display,
             id: action.id,
             nome: action.nome
            }
    }else{
        
        return state
    }

}

export default openCart