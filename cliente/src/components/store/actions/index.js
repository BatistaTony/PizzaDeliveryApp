

async function saveTolocalStorage(state){
    try {
        
        const serializedState = await JSON.stringify(state)
        localStorage.setItem('user', serializedState)

    } catch (error) {
        console.log(error)
    }
    
}

export function getUser(user){

    saveTolocalStorage(user)

    return {
        type: 'GET_USER',
        user: user
    }
}
export function logout(){

    localStorage.removeItem('user')

    return {
        type:'LOG_OUT'
    }
}