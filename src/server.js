import express from 'express';
import dotenv from 'dotenv'
import { registerFunction, loginFunction } from './controllers/controllers.js';
const app = express()

dotenv.config()
app.use(express.json());

app.post('/register', registerFunction)
app.post('/login', loginFunction)


app.get('/', (req, res) => {
  res.status(200).send({
    "code": "200",
    "data": {
      "message": "api berhasil dibuat",
    }
  });
})

export default app;

