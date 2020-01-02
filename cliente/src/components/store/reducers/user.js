




// async function loadFromLocalstorage(){
//     try {

//         const serializedState = await localStorage.getItem('user')
//         if(serializedState === null) return undefined

//         return JSON.parse(serializedState)

//     } catch (error) {
//         console.log(error)
//         return undefined
//     }
// } 

export default function User (state = 0, action){

    if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'))
    }else{

        switch(action.type){

            case "GET_USER": {
                return action.user 
            }

            case "LOG_OUT":{
                return state
            }

            default: {
                return state
            }

        }

    }
}