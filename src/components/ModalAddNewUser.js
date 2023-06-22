import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { postCreateUser } from '../services/UserSevices'
import { toast } from 'react-toastify';


const ModalAddNew = (props) => {


    const { handleClose, show, handleUpdateTable } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);
        if (res && res.id) {
            handleClose();
            setName('')
            setJob('');
            toast.success('A user is created Success')
            handleUpdateTable({ first_name: name, id: res.id })
        } else {
            toast.error('An error!')

        }
    }
    return (
        <>


            <Modal
                backdrop='static'
                keyboard={false}
                show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
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
                                        value={job}
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
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>






    )
}
export default ModalAddNew;