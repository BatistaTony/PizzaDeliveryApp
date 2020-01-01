

export function getOneFood(food){
    return {
        type:'GET_ONE_FOOD',
        food: food
    }
}



export function getFood(){
    return {
        type:'GET_FOOD'
    }
}

export function showEdit(food){
    return {
        type: 'SHOW_EDIT',
        food: food
    }
}