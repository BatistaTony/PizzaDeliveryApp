
import axios from 'axios'
const cart = []

        axios.get('/Cart/getCartsAC').then((res)=>{ 
            cart.push(res.data.cart.length) 
        })


const cartOntheway = (state = cart, action)=>{

  
        return state

}


export default cartOntheway