import express from 'express';
import router from './routes/router';
import PORT from './serverConfig';

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(
  PORT,
  () => console.log(`Server is running on PORT ${PORT}`)
);