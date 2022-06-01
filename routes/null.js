// Null Route

const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.status(404).render("error");
});

module.exports = router;
