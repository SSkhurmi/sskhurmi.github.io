import React, { useEffect, useState } from 'react'
import "../style/addBookFormStyle/AddBookForm.css"
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/action/userBookActions';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LeftMenuBar from '../components/LeftMenuBar';
import { Button, Input } from 'antd';
import TopMenuBar from '../components/TopMenuBar';


function AddBook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    useEffect(() => {
        let loggedUser = localStorage.getItem("loggedin");
        if (!loggedUser) {
            navigate("/login");
        }
    });

    const [bookInfo, setBookInfo] = useState({
        name: "",
        author_name: "",
        read_percentage: "",
        book_pdf: "",
        genre: "",
        image: ""
    });

    const handleInputPdf = async (e) => {
        let file = e.target.files[0];
        if (!file) {
            setErrors(prev => ({
                ...prev,
                book_pdf: ""
            }));
            return;
        }
        let pdf = await convertBase64(file);
        setBookInfo(prev => ({
            ...prev,
            book_pdf: pdf
        }));
    }

    const handleInputImage = async (e) => {
        let file = e.target.files[0];
        if (!file) {
            setErrors(prev => ({
                ...prev,
                image: ""
            }));
            return;
        }
        let url = await convertBase64(file);
        setBookInfo(prev => ({
            ...prev,
            image: url
        }));
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleInput = (e) => {
        let { name, value } = e.target;
        setBookInfo((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};
        let name = (/^[A-Za-z ]{3,}$/);
        if (bookInfo.name == 0) {
            errors.name = '*Name is required';
        } else if (!name.test(bookInfo.name)) {
            errors.name = '*Name is invalid';
        }
        if (bookInfo.author_name == 0) {
            errors.author_name = '*Author name is required';
        } else if (!name.test(bookInfo.author_name)) {
            errors.author_name = '*Author  is invalid';
        }
        if (bookInfo.genre == 0) {
            errors.genre = '*Genre is required';
        } else if (!name.test(bookInfo.genre)) {
            errors.genre = '*Genre is invalid';
        }
        if (bookInfo.book_pdf == 0) {
            errors.book_pdf = '*Book PDF is required'
        }
        if (bookInfo.image == "") {
            errors.image = '*Image is required';
        }
        if (Object.keys(errors).length === 0) {
            bookInfo.read_percentage = 0;
            dispatch(addBook(bookInfo));
            navigate("/home");
            setErrors("");
        } else {
            setErrors(errors);
        }
    }

    return (
        <>
            {<TopMenuBar />}
            {<Header />}
            <div className='component_section'>
                {<LeftMenuBar />}
                <div className='book-form'>
                    <div className='background-book'>
                    </div>
                    <div className='add-book-section'>
                        <h2 className='form-heading'>Add Book</h2>
                        <form>
                            <div className=''>
                            </div>
                            <label className='form-label'>  </label>
                            <Input type='text' placeholder='Book Name' onChange={handleInput} name="name" value={bookInfo.name} />
                            <span>{errors.name}</span>
                            <br />
                            <label className='form-label'>  </label>
                            <Input type='text' placeholder='Author Name' onChange={handleInput} name="author_name" value={bookInfo.author_name} />
                            <span>{errors.author_name}</span>
                            <br />
                            <label className='form-label'> </label>
                            <Input type='text' placeholder=' Genre' onChange={handleInput} name="genre" value={bookInfo.genre} />
                            <span>{errors.genre}</span>
                            <br />
                            <label className='form-label'> Book Pdf: </label>
                            <input type='file' className='input-file' accept="application/pdf" onChange={handleInputPdf} name='book_pdf' />
                            <span>{errors.book_pdf}</span>
                            <br />
                            <label className='form-label'>Cover Photo: </label>
                            <input type='file' placeholder='Phtots' accept="image/*" className='input-file' onChange={handleInputImage} name='image' />
                            <span>{errors.image}</span>
                            <br />
                            <Button className="add-book-submit-button" type='primary' onClick={handleSubmit}>Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBook