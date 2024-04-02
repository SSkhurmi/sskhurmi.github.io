
export const showBooks = (data)=>{
    // console.log(data);
    return{
        type:"SHOW_BOOK",
        data
    }
}
export const addBook = (data)=>{
    console.log(data);

    return{
        type:"ADD_BOOK",
        data:data
    }

}

export const showUser = (data)=>{
    

    return{
        type:"SHOW_USER",
        data:data
    }
}

export const addUser = (data)=>{
    console.log(data);

    return{
        type:"ADD_USER",
        data:data
    }
}