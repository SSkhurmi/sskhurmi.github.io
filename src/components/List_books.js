import React, { useEffect, useState } from 'react'
import "../style/listStyle/List.css"
import { useDispatch, useSelector } from 'react-redux';
import { showBooks } from '../redux/action/ShowbookAction';
import { Modal } from 'antd';

function List_books(props) {

  const { filter , serachEnable,showNotFound } = props;
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBook);
  const [selectedData, setSelectedData] = useState({});
 
  useEffect(() => {

    dispatch(showBooks());
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (val) => {
    setSelectedData(val);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>

   
      {filter.length > 0 ? (
        <div className='book-details'>
          <div className='heading'>
            <div className='view'>Title</div>
            <div className='view'>Genre</div>
            <div className='view'>Reading Progress</div>
            <div className='view'>Last Opened</div>
          </div>
          {filter.length > 0 && filter.map((val) => {
            // console.log(index);
            return (

              <div key={val.id} className='content'  >
                <div className='content-view title'>
                  <img src={val.image} onClick={ () => showModal(val)} />
                  <div className='title-content'>
                    <h3>{val.name}</h3>
                    <p>{val.author_name}</p>
                  </div>

                </div>
                <div className='content-view'>{val.genre}</div>
                <div className='content-view'>{val.read_percentage}</div>
                <div className='content-view'> a day ago</div>
              </div>

            )
          })}
        </div>
      )  : (
        serachEnable && showNotFound ? (!filter.length && <p className="data-not-found"> Result not Found </p>) 
      : (



        <div className='book-details'>
          <div className='heading'>
            <div className='view view-title'>Title</div>
            <div className='view'>Genre</div>
            <div className='view'>Reading Progress</div>
            <div className='view'>Last Opened</div>
          </div>
          {allBooks.data && allBooks.data.map((val) => {
            // console.log(index);
            return (

              <div key={val.id} className='content'>
                <div className='content-view title'>
                  <img src={val.image}  onClick={ () => showModal(val)}/>
                  <div className='title-content'>
                    <h3>{val.name}</h3>
                    <p>{val.author_name}</p>
                  </div>

                </div>
                <div className='content-view'>{val.genre}</div>
                <div className='content-view'>{val.read_percentage}</div>
                <div className='content-view'> a day ago</div>
              </div>

            )
          }
          )
          }
        </div>
      )
      )
      }

        <Modal height={"80%"} width={"80%"} title={`Book Name: ${selectedData.name}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
          {console.log(selectedData)}
        <embed src={selectedData.book_pdf} type="application/pdf" width="100%" height="500px" />
        </Modal>
    </>
  )
}

export default List_books