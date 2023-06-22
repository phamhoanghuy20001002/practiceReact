import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';

import { useEffect } from 'react'
import AppRouter from './router/AppRouter';
import { useSelector, useDispatch } from 'react-redux'
import { handleRefresh } from './redux/actions/userActions'
function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      // loginContext(localStorage.getItem('email'), (localStorage.getItem('token')))
      dispatch(handleRefresh())
    }
  }, [])
  return (
    <>
      <div className='app-container'>

        <Header></Header>
        <Container>

          <AppRouter />


        </Container>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}

    </>

  );
}

export default App;
