import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/UserSevices'
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {


    const { handleClose, show, dataUserDelete, handleDeleteUserFromModal } = props;
    const handleConfirm = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            toast.success('success')
            handleClose()
            handleDeleteUserFromModal(dataUserDelete)
        } else {
            toast.error('error...')
        }
        console.log(res)
    }

    return (
        <>


            <Modal
                backdrop='static'
                keyboard={false}
                show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='body-add-new'>
                        <h5>Are you sure to delete this user?</h5>
                        <b>email: {dataUserDelete.email}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>






    )
}
export default ModalConfirm;