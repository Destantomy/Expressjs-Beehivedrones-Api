const express = require('express');
require('dotenv').config();
const connectDB = require('./database/connection');
const landingRouter = require('./routes/landingRoute');
const authRouter = require('./routes/authRoute');
const articleRouter = require('./routes/articleRoute');
const projectRouter = require('./routes/projectRoute');

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routing
app.use('/api/auth', authRouter);
app.use('/api/landing', landingRouter);
app.use('/api/article', articleRouter);
app.use('/api/project', projectRouter);

// db connect
connectDB();

app.listen(port, () => {
  console.log(`server up and running on http://localhost:${port}`);
});