// Badge Route

const HOST = "gitwar.herokuapp.com";

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.query) {
    res
      .status(404)
      .redirect("https://img.shields.io/badge/Gitwar%20Score-NULL-red");
  }

  console.log(req.query);

  const username = req.query.username.toString();

  const label = req.query.label || "Gitwar Score";
  const style = req.query.style || "flat";
  const color = req.query.color || "0088cc";
  const logo = req.query.logo || "github";
  const logoColor = req.query.logoColor || "white";

  res
    .status(200)
    .redirect(
      `https://img.shields.io/badge/dynamic/json?label=${label}&style=${style}&color=${color}&logo=${logo}&logoColor=${logoColor}&query=score&url=http%3A%2F%2F${HOST}%2Fapi%2F${username}`
    );
});

module.exports = router;
