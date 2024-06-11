import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
app.use(express.static(path.join(__dirname, '/public')));


const notFound = (req, res) =>  res.status(404).sendFile(path.join(__dirname, '../public/404.html'))

export default notFound