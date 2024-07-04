import { createStore , applyMiddleware ,compose } from 'redux'
import { thunk } from 'redux-thunk' //para funciones asincronas
import reducer from './reducers'

const store = createStore(
    reducer, 
    compose(applyMiddleware(thunk),

    typeof window === 'object' && 
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? 
            window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        // window.__REDUX_DEVTOOLS_EXTENSION__ &&  
        // window.__REDUX_DEVTOOLS_EXTENSION__()
    
    )
)
export default store