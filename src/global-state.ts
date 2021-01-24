
export const initState = {
    page: 1,
    result: {},
}

export const reducer = (state: any, 
    action: {type: string, payload?: any}
) => {
    switch(action.type) {
        case 'UPDATE':
            return {
                page: 1,
                result: action.payload,
            }
        case 'NOT_FOUND':
            return {
                page: 1,
                result: {},
            }
        default: return state
    }
}