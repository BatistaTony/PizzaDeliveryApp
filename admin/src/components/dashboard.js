import React, {useEffect} from 'react'
import './styles/main.css'
import NavbarLeft from './navbar-left'
import NavbarTop from './navbar-top'
import DashboardContent from './dashboard_content'
import { useDispatch } from 'react-redux'
import { GET_CARTS_NUMBER, GET_CARTS_PENDENTE } from './store/actions/cartActions' 



export default  function Dashboard(){
    
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(GET_CARTS_NUMBER())
        dispatch(GET_CARTS_PENDENTE())

    })
   
   
    return(        

        <div className="dashboard">

            <NavbarTop />
            <NavbarLeft active={'home'}/>

            <DashboardContent />
 
            <div className="content">      
                
            </div>   

            </div>
    )
    
}