
import axios from 'axios'

var len = []

 axios.get('/Cart/getCartsPd').then(async (res)=>{ 
           len.push(await res.data.cart.length)      
    })
 

const Carrinho = (state =  len, action)=>{

    if(action.type === "GET_CARTS_NUMBER"){
   
        return state

    }else{
        return state
    }
   

}

export default Carrinho