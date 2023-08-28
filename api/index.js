const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// routes
const userRouter = require('./routes/user') 
const authRouter = require('./routes/auth') 
const productRouter = require('./routes/product') 
const cartRouter = require('./routes/cart') 
const orderRouter = require('./routes/order') 
const stripeRoute = require("./routes/stripe");

//end
const cors = require('cors')
mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => console.log("db connected mongoose"))
  .then((err) => {
    err;
  });
app.use(cors())
app.use(express.json())
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/products',productRouter);
app.use('/api/carts',cartRouter);
app.use('/api/orders',orderRouter);
app.use("/api/checkout", stripeRoute);

app.listen( process.env.PORT ||9000, () => {
  console.log("backend server is running");
});
