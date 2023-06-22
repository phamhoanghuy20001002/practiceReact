import { useEffect, useState, useContext } from 'react';
import './Login.scss'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Usercontext'
import { handleLoginRedux } from '../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const isLoading = useSelector(state => state.user.isLoading)
    const account = useSelector(state => state.user.account)

    useEffect(() => {
        if (account && account.auth === true) {
            navigate('/')
        }

    }, [account])
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required');
            return;
        }
        dispatch(handleLoginRedux(email, password));

    }
    const handleGoBack = () => {
        navigate('/');
    }
    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin()
        }
    }
    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Login</div>
                <div className="text">Email or username:eve.holt@reqres.in</div>
                <input
                    type='text'
                    placeholder='Email or username'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className='input-password'>
                    <input
                        type={isShowPassword === true ? 'text' : 'password'}
                        placeholder='Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handlePressEnter(event)}
                    />
                    <i className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>

                <button
                    onClick={() => handleLogin()}
                    className={email && password ? 'active' : ''} disabled={email && password ? false : true}> {isLoading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
                    &nbsp; Login</button>
                <div className='back'><i className='fa-solid fa-angles-left'></i>

                    <span onClick={() => handleGoBack()}>go back</span>

                </div>
            </div>
        </>
    )
}
export default Login;