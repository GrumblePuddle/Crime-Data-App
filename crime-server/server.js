import express from "express";
import swagger from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

app.use(express.json());

const app = express();
const PORT = 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Crime API",
      version: "1.0.0",
      description: "API for managing crime data",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.get("/crimes", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
