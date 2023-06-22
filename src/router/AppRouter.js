import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login';
import PrivateRouter from './PrivateRouter';
import TableUsers from '../components/TableUsers';
import NotFound from './NotFound';

const AppRouter = () => {
    return (<>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />

            <Route path='/users' element={
                <PrivateRouter>
                    <TableUsers />
                </PrivateRouter>} />
            <Route path='*' element={<NotFound />} />

        </Routes>

    </>)
}
export default AppRouter