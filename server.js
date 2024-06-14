
import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv"

const app = express();
dotenv.config()




app.use(express.json());


import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/public')));




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//? Routes

import registerRouter from './routes/register.js';
import authRouter from './routes/auth.js';
import refreshRouter from './routes/refresh.js';
import logoutRouter from './routes/logout.js';
import userRouter from './routes/api/users.js';
import pageRouter from './routes/pages/page.js';



connectDB()








app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);
app.use("/users", userRouter);
app.use("/", pageRouter);








const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
