const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  axios
    .get(
      `https://github-trending-api.now.sh/repositories?language=javascript&since=monthly&spoken_language_code=english`
    )
    .then(async function(response) {
      let index = 0;
      let names = [];
      response.data.map(function await(elem) {
        names[index] = {
          avatar: elem.avatar,
          name: elem.name,
          author: elem.author,
          url: elem.url,
          description: elem.description,
          stars: elem.stars,
          forks: elem.forks
        };
        index++;
      });
      await res.render("top", { names: names });
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res) => {
  axios
    .get(
      `https://github-trending-api.now.sh/repositories?language=${req.body.language}&since=${req.body.time}&spoken_language_code=english`
    )
    .then(async function(response) {
      let index = 0;
      let names = [];
      response.data.map(function await(elem) {
        names[index] = {
          avatar: elem.avatar,
          name: elem.name,
          author: elem.author,
          url: elem.url,
          description: elem.description,
          stars: elem.stars,
          forks: elem.forks
        };
        index++;
      });
      await res.render("top", { names: names });
    })
    .catch(err => console.log(err));
});

module.exports = router;
