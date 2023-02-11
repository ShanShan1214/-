import Type from "../action/type"
// import  {createStore} from  "redux"
function partlistReducer(state = { list: [] }, action: any) {
    // console.log(action);
    switch (action.type) {
        case Type.PARTALIST:
            return { list:action.payload}
    }
    return state;
}
export default partlistReducer;