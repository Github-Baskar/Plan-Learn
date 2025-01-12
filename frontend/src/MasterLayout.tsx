import { Outlet } from 'react-router-dom';
import Header from './components/groupComponents/Header';

const MasterLayout = () => {
    return (
        <div className='min-h-[100vh]'>
            <Header />
            <Outlet />
        </div>
    )
}

export default MasterLayout