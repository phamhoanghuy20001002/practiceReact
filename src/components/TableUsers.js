import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserSevices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNewUser';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './modalConfirm';
import _, { debounce } from 'lodash';
import './TableUsers.scss'
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse';
import { toast } from 'react-toastify';

const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false)

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataUserDelete, setDataUserDelete] = useState({})
    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');
    const [keyWord, setKeyWord] = useState('')
    const [dataExport, setDataExport] = useState([])

    const handleClose = () => {
        setIsShowModalAddNew(false)
        setIsShowModalEditUser(false)
        setIsShowModalDelete(false)
    }
    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEditUser(true)
    }
    const handleUpdateEdit = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name
        setListUsers(cloneListUsers);
        setIsShowModalEditUser(false)
    }
    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers)
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
        setListUsers(cloneListUsers);
    }
    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }
    const handleImport = (event) => {

        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            console.log(file)

            if (file.type !== 'text/csv') {
                toast.error('Only accept csv file')
                return;
            }
            // Parse local CSV file
            Papa.parse(file, {
                header: true,
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== 'email'
                                || rawCSV[0][1] !== 'first_name'
                                || rawCSV[0][2] !== 'last_name'
                            ) {
                                toast.error('wrong format header csv')

                            }
                            else {
                                let result = []
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]
                                        results.push(obj)
                                    }
                                })
                                setListUsers(result)
                            }
                        }
                        else {
                            toast.error('wrong format file csv')
                        }
                    } else {
                        toast.error('Not found data on CSV files')
                    }
                    console.log("Finished:", results.data);
                }
            });
        }

    }
    useEffect(() => {
        getUsers(1)
    }, [])
    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    }
    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }
    const handleDelete = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user)

    }
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField)
        let cloneListUsers = _.cloneDeep(listUsers)
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
        setListUsers(cloneListUsers);

    }
    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers)
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
            setListUsers(cloneListUsers);
        } else {
            getUsers(1)
        }
    }, 300)
    const getUsersExport = (event, done) => {
        let result = []
        if (listUsers && listUsers.length > 0) {
            result.push(['Id', 'Email', 'First name', 'Last name'])
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id
                arr[1] = item.email
                arr[2] = item.first_name
                arr[3] = item.last_name
                result.push(arr);
            })
            setDataExport(result)
            done();
        }
    }
    return (<>
        <div className='my-3 add-new d-sm-flex'>
            <span ><b> List User:</b></span>

            <div className='group-btn mt-sm-0 mt-2'>
                <label className='btn btn-warning' htmlFor='test'>Import</label>
                <input id='test' type='file'
                    hidden
                    onChange={(event) => handleImport(event)} />
                <CSVLink
                    filename={"user.csv"}
                    className="btn btn-primary"
                    target="_blank"
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={getUsersExport}
                >
                    Export </CSVLink>
                <button className='btn btn-success'
                    onClick={() => setIsShowModalAddNew(true)}>Add new users</button></div>

        </div>
        <div className=' col-12 col-sm-4 my-3'>
            <input
                className='form-control'
                placeholder='search user by email...'
                onChange={(event) => handleSearch(event)}
            />
        </div>
        <div className='customize-table'>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th >
                            <span className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i
                                        onClick={() => handleSort('desc', 'id')}

                                        className='fa-solid fa-arrow-down-long'></i>
                                    <i
                                        onClick={() => handleSort('asc', 'id')}

                                        className='fa-solid fa-arrow-up-long'></i>
                                </span>
                            </span>



                        </th>
                        <th>Email</th>
                        <span className='sort-header'>
                            <span>First Name</span>
                            <span>
                                <i
                                    onClick={() => handleSort('desc', 'first_name')}

                                    className='fa-solid fa-arrow-down-long'></i>
                                <i
                                    onClick={() => handleSort('asc', 'first_name')}

                                    className='fa-solid fa-arrow-up-long'></i>
                            </span>
                        </span>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>

                                    <td>
                                        <button
                                            onClick={() => handleEditUser(item)}
                                            className='btn btn-warning mx-3'>Edit</button>
                                        <button
                                            onClick={() => handleDelete(item)}

                                            className='btn btn-danger'>Delete</button>

                                    </td>

                                </tr>

                            )
                        })
                    }


                </tbody>
            </Table>

        </div>

        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"

            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
        />
        <ModalAddNew
            show={isShowModalAddNew}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
        />
        <ModalEditUser
            show={isShowModalEditUser}
            dataUserEdit={dataUserEdit}
            handleClose={handleClose}
            handleUpdateEdit={handleUpdateEdit}

        />
        <ModalConfirm
            show={isShowModalDelete}
            handleClose={handleClose}
            dataUserDelete={dataUserDelete}
            handleDeleteUserFromModal={handleDeleteUserFromModal}
        />

    </>)
}
export default TableUsers;