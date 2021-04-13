// Calculate Score

const axios = require("axios");

// Get Profile
module.exports = async function getProfile(username) {
  let error;
  const profile = await axios
    .get(`https://api.github.com/users/${username}`)
    .then(async function (response) {
      const score = await calc(response.data);
      const repo_stars = await repoStars(response.data.login);
      const repo_forks = await repoForks(response.data.login);
      const user_orgs = await userOrgs(response.data.login);

      let myProfile = {
        avatar: response.data.avatar_url,
        username: response.data.login,
        name: response.data.name,
        public_repos: response.data.public_repos,
        repo_stars: repo_stars,
        repo_forks: repo_forks,
        followers: response.data.followers,
        user_orgs: user_orgs,
        score: score,
        url: response.data.html_url,
      };
      return myProfile;
    })
    .catch((profileError) => {
      error = "error";
      console.log(profileError);
    });
  if (error == "error") {
    return error;
  } else {
    return profile;
  }
};

// Calculate Profile Score
async function calc(profile) {
  const star = await staredRepos(profile.login);
  const stars = parseInt(star) * 5;
  const org = await userOrgs(profile.login);
  const orgs = parseInt(org) * 50;
  const public_repos = parseInt(profile.public_repos) * 10;
  const public_gists = parseInt(profile.public_gists) * 5;
  const repo_stars = await repoStars(profile.login);
  const repo_stars_score = repo_stars * 5;
  const repo_forks = await repoForks(profile.login);
  const repo_forks_score = repo_forks * 5;
  const followers = parseInt(profile.followers) * 15;
  const score =
    stars +
    orgs +
    public_repos +
    public_gists +
    followers +
    repo_stars_score +
    repo_forks_score;

  return score;
}

// Calculate Orgs
async function userOrgs(profile) {
  const orgs = await axios
    .get(`https://api.github.com/users/${profile}/orgs`)
    .then(function (res) {
      return res.data.length;
    })
    .catch((err) => console.log(err));
  return orgs;
}

// Calculate Stared Repos
async function staredRepos(profile) {
  const star = await axios
    .get(`https://api.github.com/users/${profile}/starred`)
    .then(function (res) {
      return res.data.length;
    })
    .catch((err) => console.log(err));
  return star;
}

// Calculate Repo Stars
async function repoStars(profile) {
  let totalRepoStars = 0;
  const repoStarsArray = await axios
    .get(`https://api.github.com/users/${profile}/repos?per_page=500&type=all`)
    .then(function (res) {
      return res.data.map((url) => {
        return url.stargazers_count;
      });
    })
    .catch((err) => console.log(err));

  await repoStarsArray.forEach((element) => {
    totalRepoStars += parseInt(element);
    return totalRepoStars;
  });

  return totalRepoStars;
}

// Calculate Repo Forks
async function repoForks(profile) {
  let totalRepoForks = 0;
  const repoForksArray = await axios
    .get(`https://api.github.com/users/${profile}/repos?per_page=500&type=all`)
    .then(function (res) {
      return res.data.map((url) => {
        return url.forks_count;
      });
    })
    .catch((err) => console.log(err));

  await repoForksArray.forEach((element) => {
    totalRepoForks += parseInt(element);
    return totalRepoForks;
  });

  return totalRepoForks;
}
