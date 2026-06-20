
// ℹ️ Loads environment variables from a .env file into process.env
try {
  process.loadEnvFile()
} catch(error) {
  console.warn(".env file not found, using default environment values")
}


require("dotenv").config();

const express = require("express");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


//connection to the DB
/*
require("./db");

const config= require("./config")
config(app)
*/

// ℹ️ Middleware that establishes a database connection. Ensures the connection is created on every request. Required for serverless deployments.
const connectDB = require("./db");
app.use(async (req, res, next) => {
  await connectDB()
  next()
})


// ℹ️ Test Route. Can be left and used for waking up the server if idle
app.get("/", (req, res, next) => {
  res.json("All good in here");
});


app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const router = require("./routes/index.routes")
app.use("/api", router)


// ERROR HANDLING
/*
app.use((err, req, res, next) => {
  console.error(err);

  let statusCode = err.status || 500;
  let message = err.message || "Internal server error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid id format";
  }

  res.status(statusCode).json({ message });
});
*/

// ❗ Centralized error handling (must be placed after routes)
const handleErrors = require("./errors")
handleErrors(app);

const PORT = process.env.PORT || 5002; 

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
