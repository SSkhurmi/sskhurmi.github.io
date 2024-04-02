import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { Modal } from 'antd';


function Books_grid(props) {

  const { filter, showNotFound, serachEnable, searchValue } = props;
  const allBooks = useSelector((state) => state.allBook);
  const [selectedData, setSelectedData] = useState({});



  console.log(allBooks, showNotFound, serachEnable);

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


  console.log("filter val", filter);
  return (
    <>
      {filter.length > 0 ? (
        <div className='bookgrid'>
          {filter && filter.length > 0 && filter.map((val) => {
            // console.log(index);
            return (
              <div key={val.id} className='card' onClick={() => showModal(val)} >
                <div className='bg_image' style={{ backgroundImage: `url("${val.image}")` }}>
                  <div className='complete_percentage'>{val.read_percentage}</div>
                  <div className='book_name'>{val.genre} </div>
                </div>
                <div className='comic_deatils'>
                  <h2 className='comic_name'>{val.name}</h2>
                  <p className='author_name'>{val.author_name}</p>
                </div>
              </div>
            )
          })
          }
        </div>
      ) : (
        serachEnable && showNotFound ? (!filter.length && <p className="data-not-found">
           {/* <span style={{ color: "#1677ff" }}>"{searchValue}"</span> */}
            Result not Found </p>)
          : (

            <div className='bookgrid'>
              {allBooks && allBooks.data && allBooks.data.map((val) => {
                return (
                  <div key={val.id} className='card' >
                    <div className='bg_image' onClick={() => showModal(val)} style={{ backgroundImage: `url("${val.image}")` }}>
                      <div className='complete_percentage'>{val.read_percentage}%</div>
                      <div className='book_name'>{val.genre} </div>
                    </div>
                    <div className='comic_deatils'>
                      <h2 className='comic_name'>{val.name}</h2>
                      <p className='author_name'>{val.author_name}</p>
                    </div>
                  </div>
                )
              })
              }
            </div>

          )

      )}


      <Modal height={"60%"} width={"80%"} title={`Book Name: ${selectedData.name}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        {console.log(selectedData)}

        <embed src={selectedData.book_pdf} type="application/pdf" width="100%" height="500px" />



      </Modal>





    </>

  );
}

export default Books_grid