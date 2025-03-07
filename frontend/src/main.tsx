// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './store/index.ts'

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </Provider>
    // </StrictMode>,
)
