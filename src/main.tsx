import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './index.css';
import App from '@app/App';

registerSW({
    immediate: true,
    onRegistered(r) {
        console.log('SW Registered: ', r);
    },
    onRegisterError(error) {
        console.log('SW Registration error: ', error);
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
