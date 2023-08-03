import express from 'express';
const routes = require("./routes/router")

const app = express();
app.use(express.json());
app.use("/api", routes);
routes(app);

export default app;