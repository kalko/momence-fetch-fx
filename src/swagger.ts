import swaggerJsDoc from "swagger-jsdoc"

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Momence Fetch FX API",
      version: "1.0.0",
      description: "API to fetch and store FX rates from CNB",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://momence-fetch-fx.up.railway.app"
            : "http://localhost:3010",
      },
    ],
  },
  apis: ["./dist/routes/rates.js"],
}

export default swaggerJsDoc(swaggerOptions)
