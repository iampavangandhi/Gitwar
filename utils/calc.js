// Calculate Score

const axios = require("axios");

const getProfile = async (username = "iampavangandhi") => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const score = await calc(data);
    const repo_stars = await repoStars(data?.login);
    const repo_forks = await repoForks(data?.login);
    const user_orgs = await userOrgs(data?.login);

    let myProfile = {
      avatar: data?.avatar_url,
      username: data?.login,
      name: data?.name,
      public_repos: data?.public_repos,
      repo_stars: repo_stars,
      repo_forks: repo_forks,
      followers: data?.followers,
      user_orgs: user_orgs,
      score: score,
      url: data?.html_url,
    };
    return myProfile;
  } catch (error) {
    throw new Error(error);
  }
};

// Calculate Profile Score
const calc = async (profile) => {
  try {
    const star = await staredRepos(profile?.login);
    const stars = parseInt(star) * 5;
    const org = await userOrgs(profile?.login);
    const orgs = parseInt(org) * 50;
    const public_repos = parseInt(profile?.public_repos) * 10;
    const public_gists = parseInt(profile?.public_gists) * 5;
    const repo_stars = await repoStars(profile?.login);
    const repo_stars_score = repo_stars * 5;
    const repo_forks = await repoForks(profile?.login);
    const repo_forks_score = repo_forks * 5;
    const followers = parseInt(profile?.followers) * 15;

    const score =
      stars +
      orgs +
      public_repos +
      public_gists +
      followers +
      repo_stars_score +
      repo_forks_score;

    return score;
  } catch (error) {
    throw new Error(error);
  }
};

try {
} catch (error) {
  throw new Error(error);
}

// Calculate Orgs
const userOrgs = async (profile) => {
  try {
    const orgs = await axios.get(
      `https://api.github.com/users/${profile}/orgs`
    );
    return orgs?.data?.length;
  } catch (error) {
    throw new Error(error);
  }
};

// Calculate Stared Repos
const staredRepos = async (profile) => {
  try {
    const star = await axios.get(
      `https://api.github.com/users/${profile}/starred`
    );

    return star.data?.length;
  } catch (error) {
    throw new Error(error);
  }
};

// Calculate Repo Stars
const repoStars = async (profile) => {
  try {
    let totalRepoStars = 0;
    const repoStarsData = await axios.get(
      `https://api.github.com/users/${profile}/repos?per_page=500&type=all`
    );

    const repoStarsArray = repoStarsData?.data?.map((url) => {
      return url?.stargazers_count;
    });
    repoStarsArray.forEach((element) => {
      totalRepoStars += parseInt(element);
    });

    return totalRepoStars;
  } catch (error) {
    throw new Error(error);
  }
};

// Calculate Repo Forks
const repoForks = async (profile) => {
  try {
    let totalRepoForks = 0;
    const repoForksData = await axios.get(
      `https://api.github.com/users/${profile}/repos?per_page=500&type=all`
    );

    const repoForksArray = repoForksData?.data?.map((url) => {
      return url?.forks_count;
    });
    repoForksArray.forEach((element) => {
      totalRepoForks += parseInt(element);
    });

    return totalRepoForks;
  } catch (error) {
    throw new Error(error);
  }
};

// Get Profile
module.exports = getProfile;
