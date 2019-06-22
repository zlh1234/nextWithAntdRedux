
export const incrementCount = () => {
    return { type: "INCREMENT" }
}

export const decrementCount = () => {
    return { type: "DECREMENT" }
}

export const asyncInc = () => {
    return dispatch => {
        setTimeout(() => {
            return dispatch({ type: "INCREMENT" })
        }, 2000);
    }
}