const express = require("express");
const router = express.Router();
const axios = require("axios");
const getProfile = require("./calc");

router.get("/", (req, res) => {
  const userProfile1 = {
    avatar: "./manicon.jpeg",
    username: "NULL",
    name: "NULL",
    public_repos: "NULL",
    followers: "NULL",
    score: "NULL",
    url: "NULL",
  };
  const userProfile2 = {
    avatar: "./manicon.jpeg",
    username: "NULL",
    name: "NULL",
    public_repos: "NULL",
    followers: "NULL",
    score: "NULL",
    url: "NULL",
  };
  res.status(200).render("compare", {
    userProfile1: userProfile1,
    userProfile2: userProfile2,
  });
});

router.post("/", async (req, res) => {
  const user1 = req.body.username1.toString();
  const user2 = req.body.username2.toString();
  const profile1 = await getProfile(user1);
  const profile2 = await getProfile(user2);

  if (profile1 == "error" || profile2 == "error") {
    res.render("error");
  }
  const userProfile1 = {
    avatar: profile1.avatar,
    username: profile1.username,
    name: profile1.name,
    public_repos: profile1.public_repos,
    followers: profile1.followers,
    score: profile1.score,
    url: profile1.url,
  };
  const userProfile2 = {
    avatar: profile2.avatar,
    username: profile2.username,
    name: profile2.name,
    public_repos: profile2.public_repos,
    followers: profile2.followers,
    score: profile2.score,
    url: profile2.url,
  };
  res.status(200).render("compare", {
    userProfile1: userProfile1,
    userProfile2: userProfile2,
  });
});

module.exports = router;
