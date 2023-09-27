require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/database");
const userRouter = require("./routes/user");
const urlRouter = require("./routes/url");
const app = express();
const PORT = process.env.PORT || 4001;

// middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/user", userRouter);
app.use("/url", urlRouter);

//start server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
connect();
