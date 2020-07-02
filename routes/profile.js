const express = require("express");
const router = express.Router();
const getProfile = require("./calc");

router.get("/", (req, res) => {
  const userProfile = {
    avatar: "",
    username: "NULL",
    name: "NULL",
    public_repos: "NULL",
    followers: "NULL",
    score: "NULL",
    url: "NULL",
  };
  res.status(200).render("profile", { userProfile: userProfile });
});

router.post("/", async (req, res) => {
  const username = req.body.username.toString();
  const profile = await getProfile(username);
  if (profile == "error") {
    res.status(404).render("error");
  }
  const userProfile = {
    avatar: profile.avatar,
    username: profile.username,
    name: profile.name,
    public_repos: profile.public_repos,
    followers: profile.followers,
    score: profile.score,
    url: profile.url,
  };
  res.status(200).render("profile", { userProfile: userProfile });
});

module.exports = router;
