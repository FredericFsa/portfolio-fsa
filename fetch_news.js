
const Parser = require("rss-parser");
const fs = require("fs");
const parser = new Parser();
const now = new Date();
const formattedDate = now.toLocaleString("fr-FR");

const feeds = [
  "https://www.developpez.com/rss",
  "https://www.zdnet.fr/feeds/rss/actualites/",
  "https://news.ycombinator.com/rss",
  "https://www.lemondeinformatique.fr/flux-rss/thematique/rss.xml",
  "https://korben.info/feed",
  "https://www.clubic.com/feed/news.rss",
  "https://www.01net.com/rss/actualites/",
  "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
  "https://feeds.feedburner.com/TheHackersNews",
  "https://www.techrepublic.com/rssfeeds/articles/"
];

const ARTICLES_PER_FEED = 3;
const BAD_PHRASES = ["comment", "undefined", "lire la suite", "voir plus"];

(async () => {
	let html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualités techniques</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="manifest" href="manifest.json">
</head>
<body>
    <!-- Navigation -->
    <div id="header-container"></div>

    <script>
      const anchorHash = window.location.hash;
      fetch("header.html")
        .then(res => res.text())
        .then(data => {
          document.getElementById("header-container").innerHTML = data;
          if (anchorHash) {
            const scrollToAnchor = () => {
              const el = document.querySelector(anchorHash);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            };
            setTimeout(scrollToAnchor, 100);
          }
        });
    </script>

<h1 id="top-anchor" style="padding-top: 100px; margin-top: -30px;">Dernières actualités techniques</h1>
<p style="text-align:center; font-size: small;">Dernière mise à jour : ${formattedDate}</p>
`;

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      console.log(`📰 ${feed.title} - ${feed.items.length} articles`);
      for (let i = 0; i < Math.min(feed.items.length, ARTICLES_PER_FEED); i++) {
        const item = feed.items[i];
        const title = item.title || "Sans titre";
        const link = item.link || "#";
        const rawSummary = item.contentSnippet || item.summary || "";
        const summary = BAD_PHRASES.some(bad => rawSummary.toLowerCase().includes(bad)) ? "" : rawSummary;
        let image = "";

        if (item.enclosure && item.enclosure.url) {
          image = item.enclosure.url;
        } else if (item.content && item.content.includes("<img")) {
          const match = item.content.match(/<img[^>]+src="([^">]+)"/);
          if (match) image = match[1];
        }

        html += `<div class="article">\n`;
		html += `  <a href="${link}" target="_blank" style="display: block; margin-bottom: 1em;">${title}</a>\n`;
		if (summary) {
			html += `  <div class="summary" style="margin-bottom: 1em;">${summary}</div>\n`;
		}
		if (image) {
			html += `  <a href="${link}" target="_blank">` +
			`<img src="${image}" style="max-width: 20vw; height: auto; display: block; margin-bottom: 3em; border-radius: 10px;" alt="Image illustration">` +
			`</a>\n`;
		}
		html += `</div>\n`;

      }
    } catch (err) {
      console.error(`⚠️ Erreur avec le flux : ${url} — ${err.message}`);
    }
  }

  html += `
</body>
</html>
`;

  fs.writeFileSync("actualites_completes.html", html);
  console.log("✅ Fichier actualites_completes.html généré avec succès !");
})();
