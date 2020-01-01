
import {combineReducers} from 'redux'
import Carrinho from './carrinho'
import openCart  from './itemEnc'
import carts from './carts'
import confirmCart from './confirmCart'
import cartOntheway from './cartsOn'
import OneFood from './OneFood'
import getFood from './getFood'
import EditeFood from './editFood'
import cancelarCart from './cancelarCart'

const RudecersRoot =  combineReducers({
    Carrinho,
    openCart,
    carts,
    confirmCart,
    cartOntheway,
    OneFood,
    getFood,
    EditeFood,
    cancelarCart
})

export default  RudecersRoot