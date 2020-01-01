import axios from 'axios'

const objCart = []



const carts  = (state = objCart, action)=>{
    
    axios.get('/Cart/getCartsPd').then((res)=>{ 
        objCart.push(res.data.cart)        
    })

    if(action.type === "GET_CARTS_PENDENTE"){
        return state
    }else{
        return state
    }
}


export default carts    