const cheerio = require("cheerio");
const fetch = require("node-fetch");
const { omitBy, isNil } = require("lodash");

const GITHUB_URL = "https://github.com";

function omitNil(object) {
  return omitBy(object, isNil);
}

function removeDefaultAvatarSize(src) {
  if (!src) {
    return src;
  }
  return src.replace(/\?s=.*$/, "");
}

async function fetchRepositories({
  language = "",
  since = "daily",
  spokenLanguage = "",
} = {}) {
  const url = `${GITHUB_URL}/trending/${encodeURIComponent(
    language
  )}?since=${since}&spoken_language_code=${encodeURIComponent(spokenLanguage)}`;
  const data = await fetch(url);
  const $ = cheerio.load(await data.text());
  return $(".Box article.Box-row")
    .get()

    .map((repo) => {
      const $repo = $(repo);
      const title = $repo.find(".h3").text().trim();
      const [username, repoName] = title.split("/").map((v) => v.trim());
      const relativeUrl = $repo.find(".h3").find("a").attr("href");
      const currentPeriodStarsString =
        $repo.find(".float-sm-right").text().trim() || "";

      const builtBy = $repo
        .find('span:contains("Built by")')
        .find('[data-hovercard-type="user"]')
        .map((i, user) => {
          const altString = $(user).children("img").attr("alt");
          const avatarUrl = $(user).children("img").attr("src");
          return {
            username: altString ? altString.slice(1) : null,
            href: `${GITHUB_URL}${user.attribs.href}`,
            avatar: removeDefaultAvatarSize(avatarUrl),
          };
        })
        .get();

      const colorNode = $repo.find(".repo-language-color");
      const langColor = colorNode.length
        ? colorNode.css("background-color")
        : null;

      const langNode = $repo.find("[itemprop=programmingLanguage]");

      const lang = langNode.length ? langNode.text().trim() : null;

      return omitNil({
        author: username,
        name: repoName,
        avatar: `${GITHUB_URL}/${username}.png`,
        url: `${GITHUB_URL}${relativeUrl}`,
        description: $repo.find("p.my-1").text().trim() || "",
        language: lang,
        languageColor: langColor,
        stars: parseInt(
          $repo
            .find(".mr-3 svg[aria-label='star']")
            .first()
            .parent()
            .text()
            .trim()
            .replace(",", "") || "0",
          10
        ),
        forks: parseInt(
          $repo
            .find("svg[aria-label='fork']")
            .first()
            .parent()
            .text()
            .trim()
            .replace(",", "") || "0",
          10
        ),
        currentPeriodStars: parseInt(
          currentPeriodStarsString.split(" ")[0].replace(",", "") || "0",
          10
        ),
        builtBy,
      });
    });
}

module.exports = { fetchRepositories };
