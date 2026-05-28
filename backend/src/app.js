const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth.routes.js");
const foodRoutes = require('./routes/food.routes.js');
const foodPartnerRoutes = require('./routes/foodpartner.routes.js');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/foodpartner', foodPartnerRoutes);

module.exports = app;