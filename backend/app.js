const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use(fileUpload({
  useTempFiles: true,
}));

// Routes
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/PaymentRoute");
const wishlistRoute = require("./routes/WishListRoute");
const nestAIRoute = require("./routes/NestAIRoute");

app.use("/api/v2", nestAIRoute);
app.use("/api/v2", wishlistRoute);
app.use("/api/v2", product);
app.use("/api/v2", user);
app.use("/api/v2", order);
app.use("/api/v2", payment);

app.use(ErrorHandler);

module.exports = app;
