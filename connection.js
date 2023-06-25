const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.set('strictQuery',false);
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("DB connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
