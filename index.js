const express = require("express");
const app = express();

// Dados simulados
const animes = [
  {
    id: "1",
    title: "Naruto",
    image: "https://cdn.sugoiapi.dev/naruto.jpg",
    description: "Um ninja que quer ser Hokage"
  },
  {
    id: "2",
    title: "Attack on Titan",
    image: "https://cdn.sugoiapi.dev/aot.jpg",
    description: "Humanos vs Titãs"
  }
];

const episodes = {
  "1": [
    { id: "ep1", title: "Naruto Episódio 1", videoUrl: "https://cdn.sugoiapi.dev/player/naruto-ep1.mp4" },
    { id: "ep2", title: "Naruto Episódio 2", videoUrl: "https://cdn.sugoiapi.dev/player/naruto-ep2.mp4" }
  ],
  "2": [
    { id: "ep1", title: "AoT Episódio 1", videoUrl: "https://cdn.sugoiapi.dev/player/aot-ep1.mp4" }
  ]
};

// Middleware
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => {
  res.send("🚀 SugoiAPI está rodando!");
});

// Lista todos os animes
app.get("/animes", (req, res) => {
  res.json(animes);
});

// Retorna um anime por ID
app.get("/animes/:id", (req, res) => {
  const anime = animes.find(a => a.id === req.params.id);
  if (anime) return res.json(anime);
  res.status(404).json({ message: "Anime não encontrado" });
});

// Busca animes por nome
app.get("/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const resultado = animes.filter(anime =>
    anime.title.toLowerCase().includes(q)
  );
  res.json(resultado);
});

// Retorna episódios de um anime
app.get("/animes/:id/episodes", (req, res) => {
  const ep = episodes[req.params.id];
  if (ep) return res.json(ep);
  res.status(404).json({ message: "Episódios não encontrados" });
});

// Detalhes de um episódio
app.get("/episodes/:id", (req, res) => {
  for (const eps of Object.values(episodes)) {
    const ep = eps.find(e => e.id === req.params.id);
    if (ep) return res.json(ep);
  }
  res.status(404).json({ message: "Episódio não encontrado" });
});

// Inicialização do servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`SugoiAPI rodando na porta ${PORT}`);
});
