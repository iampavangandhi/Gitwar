// Compare Route

const express = require("express");
const router = express.Router();
const getProfile = require("../utils/calc");

router.get("/", (req, res) => { 
  res.status(200).render("compare", {
    userProfile1: defaultProfile,
    userProfile2: defaultProfile,
  });
});

router.post("/", async (req, res) => {
  if (!req.body.username1 || !req.body.username2) {
    return res.status(400).render("error");
  }

  const user1 = req.body.username1.toString();
  const user2 = req.body.username2.toString();
  const profile1 = await getProfile(user1);
  const profile2 = await getProfile(user2);

  if (profile1 == "error" || profile2 == "error") {
    return res.status(404).render("error");
  }

  const userProfile1 = {
    avatar: profile1.avatar,
    username: profile1.username,
    name: profile1.name,
    public_repos: profile1.public_repos,
    repo_stars: profile1.repo_stars,
    repo_forks: profile1.repo_forks,
    followers: profile1.followers,
    user_orgs: profile1.user_orgs,
    score: profile1.score,
    url: profile1.url,
  };

  const userProfile2 = {
    avatar: profile2.avatar,
    username: profile2.username,
    name: profile2.name,
    public_repos: profile2.public_repos,
    repo_stars: profile2.repo_stars,
    repo_forks: profile2.repo_forks,
    followers: profile2.followers,
    user_orgs: profile2.user_orgs,
    score: profile2.score,
    url: profile2.url,
  };

  res.status(200).render("compare", {
    userProfile1: userProfile1,
    userProfile2: userProfile2,
  });
});

module.exports = router;
