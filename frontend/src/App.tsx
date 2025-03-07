import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MasterLayout from './MasterLayout';
import ScrollToTop from './components/baseComponents/ScrollToTop';
import HomePage from './components/pageComponents/HomePage';
import MyPlannerPage from './components/pageComponents/MyPlannerPage';
import AddPlannerPage from './components/pageComponents/AddPlannerPage';
import SignInPage from './components/pageComponents/SignInPage';
import SignUpPage from './components/pageComponents/SignUpPage';
import PlannerInfoPage from './components/pageComponents/PlannerInfoPage';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path='/sign-in' element={<SignInPage />} />
                <Route path='/sign-up' element={<SignUpPage />} />
                <Route path='/' element={<MasterLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='/create' element={<AddPlannerPage />} />
                    <Route path='/my-plans' element={<MyPlannerPage />} />
                    <Route path='/my-plans/:id' element={<PlannerInfoPage />} />
                </Route>
            </Routes>
            <ToastContainer
                position="top-center"
                aria-label="Toastify"
            />
        </Router>
    )
}

export default App
