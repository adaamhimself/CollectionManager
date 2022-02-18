const express = require('express');
const cors = require('cors');
const app = express();
const http = require("http");
const db = require('./dbConnect');

app.use(cors());
app.use(express.json());


// Routes
const authRouter = require('./routes/authRoutes');
app.use('/api/auth', authRouter);

const devRouter = require('./routes/devRoutes');
app.use('/api/dev', devRouter);

const collectionRouter = require('./routes/collectionRoutes');
app.use('/api/collection', collectionRouter);

const itemRouter = require('./routes/itemRoutes');
app.use('/api/item', itemRouter);

const storageRouter = require('./routes/storageRoutes');
app.use('/api/storage', storageRouter);

const HTTP_PORT = process.env.PORT || 8080;

// Start server and connect to database
db.connect()
.then(() => {
    http.createServer(app).listen(HTTP_PORT, () => console.log("Server listening on: " + HTTP_PORT) );
})
.catch((err) => {
    console.log("Error: " + err);
    process.exit();
});