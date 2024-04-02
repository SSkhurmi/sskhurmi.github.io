import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Leftbar from '../components/Leftbar'
import "../style/allReaderStyle/AllReader.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showUser } from '../redux/action/ShowbookAction'
import allBook from '../redux/reducers/ShowbookReducer'
import { Button, Input, Table } from 'antd'
import LeftbarTooltip from '../components/LeftbarTooltip'
import { PlusOutlined } from '@ant-design/icons'

function Allreader() {
    const navigate = useNavigate();
    const [tableFilterValue, setTableFilterValue] = useState([]);
    const [tableSearchValue, setTableSearchValue] = useState([]);
    const [searchEnable, setSearchEnable] = useState(false);
    const [showNotFound, setShowNotFound] = useState(false);
    const userDeatails = useSelector((state) => state.allBook);
    const { userData } = userDeatails;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userData.length) {
            dispatch(showUser());
        }
        let loggedUser = localStorage.getItem("loggedin");
        if (!loggedUser) {
            navigate("/login");
        }

    }, [])

    useEffect(() => {
        if (tableSearchValue !=0) {
            setSearchEnable(true);
            setShowNotFound(tableFilterValue.length == 0);
        } else {
            setSearchEnable(false);
        }
    }, [tableSearchValue]);

   console.log(searchEnable , showNotFound);

    const filterTableData = (e) => {
        setTableSearchValue(e.target.value || "");
        setTableFilterValue(userData.filter(val => val.username.toLowerCase().includes(e.target.value.trim().toLowerCase()) || val.email.toLowerCase().includes(e.target.value.trim().toLowerCase()) || val.userRole.toLowerCase().includes(e.target.value.trim().toLowerCase())
        ))


    }

    // console.log(tableFilterValue);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'username',
           
        },
        {
            title: 'Email',
            dataIndex: 'email',
           
        },
        {
            title: 'User Role',
            dataIndex: 'userRole'
        }
    ];


    return (
        <>
            {<LeftbarTooltip />}
            {<Header />}
            <div className='component_section'>
                {<Leftbar />}

                <div className='all-reader'>
                    <div className='user-buttons' >
                        <Button className='create-user-button' type="primary" onClick={() => {
                            navigate("/readerform");
                        }}> <PlusOutlined className='plus' /> Create </Button>

                        <Input.Search className='input-search' placeholder='Search User' enterButton onChange={(e) => filterTableData(e)} />
                        {/* <Search placeholder="input search text"  enterButton /> */}

                    </div>



                    <h2>User Details</h2>
                    <div className='reader-details'>
                        {tableFilterValue.length > 0
                            ? (<Table bordered className='reader-table' pagination={false} dataSource={tableFilterValue} columns={columns} />)

                            : (

                                searchEnable && showNotFound ? <Table bordered className='reader-table' pagination={false} columns={columns} />
                                    : (<Table bordered className='reader-table' pagination={false} dataSource={userData} columns={columns} />))}

                    </div>

                </div>
            </div>
        </>
    )
}

export default Allreader