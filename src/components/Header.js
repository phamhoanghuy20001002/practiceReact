import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/logo192.png';
import { useLocation, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userActions';
const Header = (props) => {
    const dispatch = useDispatch()

    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.account)

    const handleLogout = () => {

        dispatch(handleLogoutRedux())

    }
    useEffect(() => {
        if (user && user.auth === false) {
            navigate('/');
        }
    }, [user])
    console.log('dada', localStorage)
    return (<>

        <Navbar bg="light" expand="lg" >
            <Container>
                <Navbar.Brand href="#home">

                    <img
                        src={logoApp}
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                    />
                    <span>React-Bootstrap</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.auth || window.location.pathname === '/') &&
                        <>
                            <Nav className="me-auto" >

                                <NavLink className='nav-link' to='/'>Home</NavLink>

                                <NavLink className='nav-link' to='/users'>Manage Users</NavLink>

                            </Nav>
                            <Nav>
                                {user && user.email && <span className='nav-link'>Welcome {user.email}</span>}
                                <NavDropdown title="Setting" >
                                    {user && user.auth === true
                                        ? <NavDropdown.Item
                                            onClick={() => handleLogout()}
                                        >Logout</NavDropdown.Item>
                                        :
                                        <NavLink className='dropdown-item' to='/login'>Login</NavLink>

                                    }

                                </NavDropdown>
                            </Nav>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar >


    </>)
}
export default Header;