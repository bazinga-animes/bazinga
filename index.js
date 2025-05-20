const express = require("express");
const cors = require("cors");
const Sugoi = require("./src/scraper");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("?? SugoiAPI com banco de dados local funcionando!");
});

app.get("/search", async (req, res) => {
  const q = req.query.q;
  const result = await Sugoi.search(q || "");
  res.json(result);
});

app.get("/anime/:id", async (req, res) => {
  const anime = await Sugoi.getAnime(req.params.id);
  if (!anime) return res.status(404).json({ error: "Anime n?o encontrado" });

  res.json(anime);
});

app.get("/watch/:id", async (req, res) => {
  const ep = await Sugoi.getEpisode(req.params.id);
  if (!ep) return res.status(404).json({ error: "Epis¨®dio n?o encontrado" });

  res.json(ep);
});

app.listen(PORT, () => {
  console.log(`? SugoiAPI rodando na porta ${PORT}`);
});
