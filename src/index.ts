import express = require("express");
import dotenv = require("dotenv");

dotenv.config({
    path: "./.env"
})

const app = express();

app.listen(process.env.PORT, () => {
    console.log('server succesfully running @PORT:', process.env.PORT)
})