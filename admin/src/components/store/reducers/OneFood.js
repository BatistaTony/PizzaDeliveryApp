



const getOneFood = (state = {},  action)=>{
    if(action.type === "GET_ONE_FOOD"){
        return {
            food: action.food
        }
    }else{
        return 0
    }
}

export default getOneFood