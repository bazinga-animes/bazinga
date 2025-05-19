const express = require("express");
const Sugoi = require("./src/Scraper/scraper");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 1000;

app.use(cors());

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Falta o parâmetro ?q=" });
  try {
    const result = await Sugoi.search(query);
    res.json(result);
  } catch (err) {
    console.error("Erro na busca:", err);
    res.status(500).json({ error: "Erro interno na API" });
  }
});

app.get("/anime/:id", async (req, res) => {
  const animeId = req.params.id;
  try {
    const result = await Sugoi.getAnime(animeId);
    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar anime:", err);
    res.status(500).json({ error: "Erro interno na API" });
  }
});

app.get("/watch/:id", async (req, res) => {
  const epId = req.params.id;
  try {
    const result = await Sugoi.getEpisode(epId);
    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar episódio:", err);
    res.status(500).json({ error: "Erro interno na API" });
  }
});

app.listen(port, () => {
  console.log(`✅ SugoiAPI rodando na porta ${port}`);
});
