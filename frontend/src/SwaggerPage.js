
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { BASE_URL } from './api';

function SwaggerPage() {
    return (
        <div style={{ height: '100vh', minHeight: '600px' }}>
            <SwaggerUI
                url={`${BASE_URL}/swagger.yaml`}
                requestInterceptor={(req) => {
                    req.credentials = 'omit';
                    return req;
                }}
            />
        </div>
    );
}

export default SwaggerPage;
