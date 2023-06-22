import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
const PrivateRouter = (props) => {
    const user = useSelector(state => state.user.account)
    if (user && !user.auth) {
        return <>

            <Alert variant="danger" >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    you don't have permission to access this router
                </p>
            </Alert>

        </>
    }
    return (
        <>
            {props.children}
        </>
    )
}
export default PrivateRouter