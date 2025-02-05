import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MasterLayout from './MasterLayout';
import HomePage from './components/pageComponents/HomePage';
import MyPlannerPage from './components/pageComponents/MyPlannerPage';
import AddPlannerPage from './components/pageComponents/AddPlannerPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MasterLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='/create' element={<AddPlannerPage />} />
                    <Route path='/my-plans' element={<MyPlannerPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
