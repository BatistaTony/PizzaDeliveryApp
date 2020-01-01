import { createStore } from 'redux'
import ReducersRoot from './reducers/index'


const store = createStore(
    ReducersRoot,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store