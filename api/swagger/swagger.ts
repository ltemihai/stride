import * as core from "express-serve-static-core";

export const generateSwagger = (app: core.Express) => {
    const swaggerJSDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const swaggerOptions = {
        failOnErrors: true,
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Appwrite API',
                version: '0.0.1',
            },
            servers: [
                {
                    url: 'http://localhost:5002',
                }
            ],
        },
        apis: ['./api/**/*.ts'],

    }
    const swaggerSpec = swaggerJSDoc(swaggerOptions);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            requestInterceptor: function(request: any){
                request.headers.Origin = `http://localhost:5002`;
                return request;
            },
            url: `http://localhost:5002/docs/api-docs`
        }
    }));
}
