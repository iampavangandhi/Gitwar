// Index Route

const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.status(200).render("index");
});

module.exports = router;
