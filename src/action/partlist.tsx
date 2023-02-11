import Type from "../action/type"
export const initList = (payload: any) => {
    return {
        type: Type.PARTALIST,
        payload
    }
}
