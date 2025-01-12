import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MasterLayout from './MasterLayout';
import HomePage from './components/pageComponents/HomePage';
import BookmarksPage from './components/pageComponents/BookmarksPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MasterLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='/home' element={<Navigate to='/' />} />
                    <Route path='/bookmarks' element={<BookmarksPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
