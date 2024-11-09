const express = require('express');
const { chats } = require('./data/data');
const dotenv = require('dotenv')
const cors = require('cors');
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const {notExists, errorHandler} = require('./middleware/errorMiddleware')

dotenv.config();

connectDB()
const app = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000', credentials: true  }));

const PORT = process.env.PORT || 5000;


app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});


app.get("/", (req, res) => {
    res.send("API is running")
});

app.use('/api/user', userRoutes)

app.use('/api/chat',chatRoutes)

app.use(notExists);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, console.log(`server started on PORT ${PORT}`));


