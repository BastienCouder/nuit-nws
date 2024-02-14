import swaggerJsDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Nuit-nws",
            version: "1.0.0",
            description: "API de la Nuit-nws",
        },
    },
    apis: ["./src/routes/*.ts"],
}

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;