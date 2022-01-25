const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const userRouter = require('./routes/userRoutes');
app.use('/api/user', userRouter);

const HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
});