import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import ProductPage from './ProductPage';
import SwaggerPage from './SwaggerPage';

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [page, setPage] = useState('product'); // 'product' | 'swagger'

    // Hàm lấy cookie theo tên
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    // Khi load app, kiểm tra có token cookie không
    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    const handleLoginSuccess = () => {
        // Không cần localStorage nữa (nếu bạn muốn vẫn giữ cũng được)
        // localStorage.setItem('authenticated', 'true');
        setAuthenticated(true);
    };

    if (!authenticated) {
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div>
            VO TIEN 1231234124213
            <nav style={{ marginBottom: '20px' }}>
                <button onClick={() => setPage('product')}>Product Page</button>
                <button onClick={() => setPage('swagger')}>Swagger API</button>
            </nav>

            {page === 'product' && <ProductPage />}
            {page === 'swagger' && <SwaggerPage />}
        </div>
    );
}

export default App;
