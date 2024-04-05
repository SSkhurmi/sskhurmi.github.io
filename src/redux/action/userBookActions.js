import { SHOW_BOOK, SHOW_USER, ADD_BOOK, ADD_USER } from "../constant"

export const showBooks = (data) => {
    return {
        type: SHOW_BOOK,
        data
    }
}
export const addBook = (data) => {
    return {
        type: ADD_BOOK,
        data: data
    }
}

export const showUser = (data) => {
    return {
        type: SHOW_USER,
        data: data
    }
}

export const addUser = (data) => {
    return {
        type: ADD_USER,
        data: data
    }
}