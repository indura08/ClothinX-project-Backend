const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");

//methna process.env kiya kiya denne menna meken hdgnna eka thami. process.env thiynne smahara hangnna one dewal project ekn hanganna 
dotenv.config();

//methna mongodb.net kiyna ekt passe denne hamnge dtabase eke namai, ara kalin project eketh e wage dunne db eke nama
mongoose.connect(
      process.env.MONGO_URL  
).then(() => console.log("Database connected successfully")).catch((err) => console.log("error happened" , err));

app.use(cors()) // menna me kalla one frontend ekatai backend ekatai connect wenna. mokda me kalle thiynwa ehma connect wenna one policies rules wage mokdda set ekk , e set ekak include wenne menna me middleware ekn
app.use(express.json())

app.use("/api/auth" , authRoute);
app.use("/api/users" , userRoute);
app.use("/api/products" , productRoute);
app.use("/api/cart" , cartRoute);
app.use("/api/orders" , orderRoute);

app.listen(process.env.PORT || 5002, () => console.log("app is listen on port 5002"));