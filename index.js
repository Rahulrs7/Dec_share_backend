const express=require("express");
const app=express();
const cors = require('cors');
const { default: mongoose } = require("mongoose");
require('dotenv').config();
const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("mongodb connected successfully"))
.catch((err)=>console.log(err));

app.use(cors())
app.use(express.json())

app.use("/api/upload",require("./routes/upload"));

app.listen(PORT,()=>{
    console.log(`server connected at port ${PORT}`)
})
