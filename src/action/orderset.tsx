import Type from "../action/type"
export const orderset = (payload: any) => {
    return {
        type: Type.PRODUCTORDERID,
        payload
    }
}