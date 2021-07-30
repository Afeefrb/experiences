const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const postRoutes = require("./routes/postRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express(); 
dotenv.config();


app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));

app.use(cors());

//Routes ***********************

app.get("/", (req,res) => {
    res.send("Hi, welcome to Experiences API - 1:00 AM")
})
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

//Routes ***********************


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false); 