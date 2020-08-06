// Index Route

const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.status(200).render("index");
});

module.exports = router;
