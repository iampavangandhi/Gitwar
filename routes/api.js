// API Route

const express = require("express");
const router = express.Router();
const getProfile = require("../utils/calc");

router.get("/", (req, res) => {
  res.status(404).json({ error: "NOT FOUND" });
});

router.get("/:username", async (req, res) => {
  const username = req.params.username.toString();
  const profile = await getProfile(username);

  if (profile == "error") {
    return res.status(404).json({ score: "NULL", error: "NOT FOUND" });
  }

  res.status(200).json({
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
  });
});

module.exports = router;
