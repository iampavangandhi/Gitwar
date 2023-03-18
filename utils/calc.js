// Calculate Score
const axios = require("axios");

const getProfile = async (username = "iampavangandhi") => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const score = await calculateScore(data);
    const user_orgs = await userOrgs(data?.login);
    const { totalRepoStars: repo_stars, totalRepoForks: repo_forks } =
      await getRepoStarsAndForks(data?.login);

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
    console.log("Error in getProfile");
    throw new Error(error);
  }
};

// Calculate Profile Score
const calculateScore = async (profile) => {
  try {
    const star = await staredRepos(profile?.login);
    const org = await userOrgs(profile?.login);
    const { totalRepoStars: repo_stars, totalRepoForks: repo_forks } =
      await getRepoStarsAndForks(data?.login);

    const orgs = Number(org) * 50;
    const stars = Number(star) * 5;
    const repoStarsScore = Number(repo_stars) * 5;
    const repoForksScore = Number(repo_forks) * 5;
    const followers = Number(profile?.followers) * 15;
    const publicRepos = Number(profile?.public_repos) * 10;
    const publicGists = Number(profile?.public_gists) * 5;

    const score =
      stars +
      orgs +
      publicRepos +
      publicGists +
      repoStarsScore +
      repoForksScore +
      followers;

    return score;
  } catch (error) {
    console.log("Error in calculateScore");
    throw new Error(error);
  }
};

// Calculate Orgs
const userOrgs = async (profile) => {
  try {
    const orgs = await axios.get(
      `https://api.github.com/users/${profile}/orgs`
    );
    return orgs?.data?.length;
  } catch (error) {
    console.log("Error in userOrgs");
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
    console.log("Error in staredRepos");
    throw new Error(error);
  }
};

// Calculate Repo Stars & Forks
const getRepoStarsAndForks = async (profile) => {
  try {
    let totalRepoStars = 0;
    let totalRepoForks = 0;
    const userRepos = await axios.get(
      `https://api.github.com/users/${profile}/repos?per_page=500&type=all`
    );
    userRepos?.forEach((repo) => {
      totalRepoStars += Number(repo?.stargazers_count);
      totalRepoForks += Number(repo?.forks_count);
    });
    return { totalRepoStars, totalRepoForks };
  } catch (error) {
    console.log("Error in getRepoStarsAndForks");
    throw new Error(error);
  }
};

// Get Profile
module.exports = getProfile;
