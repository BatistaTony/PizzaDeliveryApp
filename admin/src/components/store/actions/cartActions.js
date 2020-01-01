

export function GET_CARTS_NUMBER(){
    return {
        type: 'GET_CARTS_NUMBER'
    }
}


export function OPEN_CART(id,display,nome){
    return {
        type: "OPEN_CART",
        id: id,
        display: display,
        nome: nome
    }
}


export function GET_CARTS_PENDENTE(){
    return {
        type:'GET_CARTS_PENDENTE'
    }
}

export function GET_CARTS_NUMBER_ENT(){
    return {
        type: 'GET_CARTS_NUMBER_ENT'
    }
}

export function CONFIRM_CART(id,display,nome){
    return {
        type: 'CONFIRM_CART',
        nome: nome,
        id:id,
        display: display
    }
}

export function Cancelar(id, display,nome){
    return {
        type:'CANCELAR',
        id: id,
        display: display,
        nome:nome
    }
}

