import swaggerJsDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Nuit-nws",
            version: "1.0.0",
            description: "API de la Nuit-nws",
        },
        servers: [
            {
              url: 'http://localhost:5000',
              description: 'Serveur de Développement',
            },
          ],
    },
    apis: ["./src/routes/*.ts"],
}

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;