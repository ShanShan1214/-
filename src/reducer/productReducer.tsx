import Type from "../action/type"
// import  {createStore} from  "redux"
function productReducer(state:any = { orderidall:0}, action: any) {
    // console.log(action);
    switch (action.type) {
        case Type.PRODUCTORDERID:
            return { orderidall:action.payload}
    }
    return state;
}
export default productReducer;