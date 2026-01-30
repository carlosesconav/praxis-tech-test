import express from "express";
import route from "./controller/app.controller.js";



const app = express();

app.use(express.json());
app.use(route);
// app.use(express.json());


export default app;