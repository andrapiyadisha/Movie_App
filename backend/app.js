const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRouter = require('./routes/user-routes');
const adminRouter = require('./routes/admin-routes');
const movieRouter = require('./routes/movie-routes');
const bookingsRouter = require('./routes/booking-routes');
const dotenv = require('dotenv').config();
const cors = require("cors");




const app = express();

app.use(cors());
app.use(bodyParser.json());

//middlewares
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

mongoose
.connect("mongodb+srv://23010101010:disha%40123@moviecluster.enq5j.mongodb.net/",{useNewUrlParser: true})
.then(()=>{

            app.listen(5000, () => {
                console.log("Server start");
            });
});
