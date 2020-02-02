const express = require("express");
const router = express.Router();
const axios = require("axios");

// Get Profile
module.exports = async function getProfile(username) {
  let error;
  const profile = await axios
    .get(`https://api.github.com/users/${username}`)
    .then(async function(response) {
      const score = await calc(response.data);
      let myProfile = {
        avatar: response.data.avatar_url,
        username: response.data.login,
        name: response.data.name,
        public_repos: response.data.public_repos,
        followers: response.data.followers,
        score: score,
        url: response.data.html_url
      };
      return myProfile;
    })
    .catch(err => (error = "error"));
  if (error == "error") {
    return error;
  } else {
    return profile;
  }
};

// Calculate Profile Score
async function calc(profile) {
  const star = await staredRepos(profile.login);
  const stars = (await parseInt(star)) * 5;
  const public_repos = parseInt(profile.public_repos) * 10;
  const public_gists = parseInt(profile.public_gists) * 3;
  const followers = parseInt(profile.followers) * 15;
  const score = (await stars) + public_repos + public_gists + followers;
  return await score;
}

// Calculate Stared Repos
async function staredRepos(profile) {
  const star = await axios
    .get(`https://api.github.com/users/${profile}/starred`)
    .then(function(res) {
      return res.data.length;
    })
    .catch(err => console.log(err));
  return star;
}
