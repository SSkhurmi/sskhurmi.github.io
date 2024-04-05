import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

const url = 'https://sskhurmi.github.io/bookdetails/bookdata.json'
const fetchData = async () => {
  try {
    const res = await fetch(url);
    const result = await res.json();
    return result;

  } catch (error) {
    throw error;
  }
};

function* fetchBook() {
  try {
    const data = yield call(fetchData);
    yield put({ type: "SHOW_BOOK_SUCCESS", data: data.books });

  } catch (e) {
    console.log(e);
  }
}

const fetchUserData = async () => {
  try{
    const res = await fetch("https://sskhurmi.github.io/userdata/userdata.json");
  const result = await res.json()
  return result;
  } catch (error){
    console.log(error);
  } 
}

function* fetchUser() {
  try {
    const data = yield call(fetchUserData);
    yield put({ type: "SHOW_USER_SUCCESS", data: data.reader });

  } catch (e) {
    console.log(e);
  }
}

function* mySaga() {
  yield takeLatest('SHOW_BOOK', fetchBook)
  yield takeLatest("SHOW_USER", fetchUser)

}

export default mySaga;  














// function* addNew(action) {


//   try {
//     console.log(action);
//     let { type, data, image } = action;
//     console.log('type, data', { type, data,image });

    

//     if (type === "ADD_BOOK") {

//       const apiData = yield call(fetchData);
//       fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json"
//         },
//         body: JSON.stringify(data),
//       })
//         .then((response) => response.json())
//         .then((json) => console.log('apiData', json));
//       console.log(apiData)

//     }
//   } catch (error) {
//     console.error('Error adding new data:', error);
//   }
// }


// function* addNew(action) {
//   try {
//     const { type, data } = action;
//     if (type === "ADD_BOOK") {
//       // Add the new book to the server
//       yield call(addBookToServer, data);
//       // No need to dispatch SHOW_BOOK action here
//     }
//   } catch (error) {
//     console.error('Error adding new data:', error);
//   }
// }

// function addBookToServer(data) {
//   return fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json"
//     },
//     body: JSON.stringify(data),
//   }).then(response => response.json());
// }