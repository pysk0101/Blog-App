
import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();
dotenv.config()

//Security
app.use(cors({
  origin: "http://localhost:5000",
  methods: "HEAD,PUT,PATCH,DELETE,OPTIONS",
  credentials: true
}));


//Middlewares
app.set("view engine", "ejs")
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database
connectDB()

//Routes
import registerRouter from './routes/register.js';
import authRouter from './routes/auth.js';
import logoutRouter from './routes/logout.js';
import userRouter from './routes/api/users.js';
import pageRouter from './routes/pages/page.js';
import blogRouter from './routes/api/blog.js';





//APIs
app.use("/blog", blogRouter);
app.use("/register", registerRouter);
app.use("/login", authRouter);
app.use("/logout", logoutRouter);
app.use("/myprofile", userRouter)
app.use("/", pageRouter);



const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
