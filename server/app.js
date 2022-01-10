require("dotenv").config();
const connectDB = require('./database/connect');
connectDB();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", require("./routers/userRouter"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));