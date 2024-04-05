import { ADD_BOOK, ADD_USER } from "../constant"

const alldata = (state = { data: [], userData: [] }, action) => {

    switch (action.type) {
        case ("SHOW_BOOK_SUCCESS"):
            return {
                ...state,
                data: action.data
            }
        case ADD_BOOK:
            return {
                ...state,
                data: [...state.data, action.data],
            }
        case ("SHOW_USER_SUCCESS"):
            return {
                ...state,
                userData: action.data
            }
        case ADD_USER:
            return {
                ...state,
                userData: [...state.userData, action.data]
            }
        default:
            return state
    }
}

export default alldata;