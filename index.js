const express = require('express');
const app = express();
const connectDB = require('./db');
const leadRoute = require('./routes/lead');

app.use(express.json());

app.use('/lead', leadRoute);

async function startServer() {
  try {
    const db = await connectDB();  

    app.locals.db = db;

    app.listen(8080, () => {
      console.log("🚀 Server running on port 8080");
    });

  } catch (err) {
    console.error("Cannot start server:", err);
  }
}

startServer();
