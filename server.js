
import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv"

const app = express();
dotenv.config()

app.use(express.json());
//?Routes
import registerRouter from './routes/register.js';
import authRouter from './routes/auth.js';
import refreshRouter from './routes/refresh.js';
import logoutRouter from './routes/logout.js';
import userRouter from './routes/api/users.js';
import pageRouter from './routes/pages/page.js';



connectDB()

//?APIs
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);
app.use("/", pageRouter);








const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
