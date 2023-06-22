import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { updateUser } from '../services/UserSevices'
import { toast } from 'react-toastify';


const ModalEditUser = (props) => {


    const { handleClose, show, dataUserEdit, handleUpdateEdit } = props;

    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const handleEditUser = async () => {
        let res = await updateUser(name, job)
        if (res && res.updatedAt) {
            handleUpdateEdit({
                first_name: name,
                id: dataUserEdit.id
            })
            toast.success('success')
        }
    }
    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
            setJob(dataUserEdit.job);
        }
    }, [dataUserEdit])//khi datauser co su thay doi
    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='body-add-new'>
                        <div>
                            <form>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        className="form-control"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >Job</label>
                                    <input
                                        className="form-control"
                                        value={undefined}
                                        onChange={(event) => setJob(event.target.value)} />
                                </div>
                                <div className="form-group form-check">
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>






    )
}
export default ModalEditUser;