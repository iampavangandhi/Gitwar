// Profile Route

const express = require("express");
const router = express.Router();
const getProfile = require("../utils/calc");

router.get("/", (req, res) => {
  const userProfile = {
    avatar:
      "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/130-512.png",
    username: "NULL",
    name: "NULL",
    public_repos: "NULL",
    repo_stars: "NULL",
    repo_forks: "NULL",
    followers: "NULL",
    user_orgs: "NULL",
    score: "NULL",
    url: "NULL",
  };
  res.status(200).render("profile", { userProfile: userProfile });
});

router.post("/", async (req, res) => {
  if (!req.body.username) {
    return res.status(400).render("error");
  }

  const username = req.body.username.toString();
  const profile = await getProfile(username);

  if (profile == "error") {
    return res.status(404).render("error");
  }

  const userProfile = {
    avatar: profile.avatar,
    username: profile.username,
    name: profile.name,
    public_repos: profile.public_repos,
    repo_stars: profile.repo_stars,
    repo_forks: profile.repo_forks,
    followers: profile.followers,
    user_orgs: profile.user_orgs,
    score: profile.score,
    url: profile.url,
  };

  res.status(200).render("profile", { userProfile: userProfile });
});

module.exports = router;
