import React, { useEffect, useState } from 'react';
import { getProducts, createProduct } from './api';

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');        // Thông báo success/error
    const [messageType, setMessageType] = useState(''); // 'success' hoặc 'error'

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data.products || []);
            } catch (error) {
                setMessage('Failed to load products');
                setMessageType('error');
            }
        }
        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        try {
            await createProduct({ name, price: parseFloat(price) });
            setMessage('Product created successfully.');
            setMessageType('success');

            // Reset form
            setName('');
            setPrice('');

            // Reload list
            const data = await getProducts();
            setProducts(data.products || []);
        } catch (error) {
            setMessage('Failed to create product.');
            setMessageType('error');
        }

        // Tự ẩn thông báo sau 3s
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 3000);
    };

    return (
        <div className="product-page">
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                    </li>
                ))}
            </ul>

            <h3>Add Product</h3>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={handleAddProduct}>Add</button>

            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default ProductPage;
