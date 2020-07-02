const express = require("express");
const dotenv = require("dotenv");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyParser.json());

const indexRouter = require("./routes/index");
const profileRouter = require("./routes/profile");
const compareRouter = require("./routes/compare");
const topRouter = require("./routes/top");
const NullRouter = require("./routes/null");

app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/compare", compareRouter);
app.use("/top", topRouter);
app.use("/NULL", NullRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is up");
});
