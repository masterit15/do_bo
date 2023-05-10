import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
const app = express()

import uploadRouter from './router/upload.router.js';
import xlsxRouter from './router/xlsx.router.js';

const __dirname = path.resolve('./')

app.use(express.json({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // тут выставим домен с которым будет работать api
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "./client/dist")));
app.get((req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

app.use("/api", uploadRouter);
app.use("/api", xlsxRouter);

app.listen('5000', ()=>console.log('Server start to port: 5000'))


