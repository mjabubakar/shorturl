const express = require("express");

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

require("dotenv/config");

const port = process.env.PORT || 6000;

app.use(bodyParser.urlencoded({ extended: true })); //remove

const allRoutes = require("./routes");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(allRoutes);

app.use((error, req, res, next) => {
    const status = error.code || 500;
    const message = error.message || "Server error occured.";
    res.status(status).json({ message });
});


app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
});