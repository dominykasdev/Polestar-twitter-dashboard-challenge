const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config()

const corsOptions = {
    origin: process.env.CORS_ORIGIN_DEV,
    methods: "GET",
    Credential: true,
    optionsSuccessStatus: 200
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/twitter', cors(corsOptions), require('./routers/api/twitter'));

app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));