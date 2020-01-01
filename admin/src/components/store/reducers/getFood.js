import axios from 'axios'

const food = []

 axios.get('/pizza/getAll').then(res=>{
            food.push(res.data.pizzas)
})


const getFood = (state = food, action)=>{

    if(action.type === "GET_FOOD"){

       
        return state

    }else{
        return state
    }
}


export default getFood