import * as dotenv from 'dotenv';
import express from 'express';
import router from './routes/router';
import PORT from './serverConfig';

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(
  PORT,
  () => console.log(`Server is running on PORT ${PORT}`)
);