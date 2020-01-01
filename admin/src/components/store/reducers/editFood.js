








const EditeFood  = (state = {}, action) =>{

    if(action.type === "SHOW_EDIT"){
        return {food: action.food}
    }else{
        return {food:0}
    }

}


export default EditeFood