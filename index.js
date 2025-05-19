const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🚀 SugoiAPI está rodando!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`SugoiAPI rodando na porta ${PORT}`);
});
