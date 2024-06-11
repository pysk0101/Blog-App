
import express from 'express';

import dotenv from "dotenv"
dotenv.config()

import connectDB from './config/db.js';

const app = express();

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());


import verifyJWT from './middleware/verifyJWT.js';



//? Routes
import notFound from './middleware/notFound.js';
import registerRouter from './routes/register.js';
import authRouter from './routes/auth.js';
import refreshRouter from './routes/refresh.js';
import logoutRouter from './routes/logout.js';
import userRouter from './routes/api/users.js';


const PORT = process.env.PORT;

connectDB()




app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, './public/login.html'))
})


app.use("/auth", authRouter);
app.use("/register", registerRouter);
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);
app.use("/users", userRouter);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './public/homepage.html'));
})

// 

  import { Deneme } from './models/userModel.js'

app.post("/deneme", async (req, res) => {
  try {
    const { name, age } = req.body;
    const data = new Deneme({
      name,
      age
    })
    await data.save();
    res.json(data);
  } catch (error) {
    res.send(error)
  }
})

app.get("/deneme", async (req, res) => {
  const data = await Deneme.find({});
  res.json(data);
})


app.use(notFound)

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
