require("dotenv").config();

const PORT = process.env.PORT

const express = require("express");


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


//connection to the DB
require("./db");

const config= require("./config")
config(app)



app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


const router = require("./routes/index.routes")
app.use("/api", router)


// ERROR HANDLING
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
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
