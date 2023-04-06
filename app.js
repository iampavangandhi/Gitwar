require("dotenv").config();
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

defaultProfile = {
  avatar: "https://avatars.githubusercontent.com/u/42767012?v=4",
  username: "iampavangandhi",
  name: "Pavan Gandhi",
  public_repos: "92",
  repo_stars: "517",
  repo_forks: "377",
  followers: "165",
  user_orgs: "6",
  score: "9915",
  url: "https://github.com/iampavangandhi",
};

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// EJS Middleware
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// Include Routes
const indexRouter = require("./routes/index");
const profileRouter = require("./routes/profile");
const compareRouter = require("./routes/compare");
const badgeRouter = require("./routes/badge");
const apiRouter = require("./routes/api");
const topRouter = require("./routes/top");
const NullRouter = require("./routes/null");

// Use Routes
app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/compare", compareRouter);
app.use("/badge", badgeRouter);
app.use("/api", apiRouter);
app.use("/top", topRouter);
app.use("/NULL", NullRouter);

const PORT = process.env.PORT || 3000;

if (!process.env.GITHUB_TOKEN) {
  // Unauthorized github requests have a rate limit 
  // of 60/hour, which is borderline unusable
  throw "No Github Token provided in environment Variables! Please provide GITHUB_TOKEN!"
}

// Server
app.listen(PORT, () => {
  console.log(`Server is up and running at Port: ${PORT}`);
});
