import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import partaListReducer from "../reducer/partaListReducer"
import productReducer from "../reducer/productReducer"
let store = combineReducers({
    partaList: partaListReducer,
    productorderid: productReducer
})

export default createStore(store, applyMiddleware(thunk));
