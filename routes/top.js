// Top Route

const express = require("express");
const router = express.Router();

const { fetchRepositories } = require("../utils/fetchTrending");

router.get("/", async (req, res) => {
  let index = 0;
  let names = [];
  const data = await fetchRepositories({
    language: "javascript",
    time: "daily",
    spokenLanguage: "english",
  });

  await data.map(function await(elem) {
    names[index] = {
      avatar: elem.avatar,
      name: elem.name,
      author: elem.author,
      url: elem.url,
      description: elem.description,
      stars: elem.stars,
      forks: elem.forks,
    };
    index++;
  });

  res.status(200).render("top", { names });
});

router.post("/", async (req, res) => {
  let index = 0;
  let names = [];
  const { language, time } = req.body;
  const data = await fetchRepositories({
    language: language,
    time: time,
    spokenLanguage: "english",
  });

  await data.map(function await(elem) {
    names[index] = {
      avatar: elem.avatar,
      name: elem.name,
      author: elem.author,
      url: elem.url,
      description: elem.description,
      stars: elem.stars,
      forks: elem.forks,
    };
    index++;
  });

  res.status(200).render("top", { names });
});

module.exports = router;
