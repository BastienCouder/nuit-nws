"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map