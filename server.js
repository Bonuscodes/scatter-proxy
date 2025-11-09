import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// читаем локальный список игр
app.get("/api/games", (req, res) => {
  try {
    const data = fs.readFileSync("./games.json", "utf8");
    res.json({ games: JSON.parse(data) });
  } catch (err) {
    res.status(500).json({ error: "Ошибка при загрузке игр" });
  }
});

// фейковый запуск игры
app.post("/api/start", (req, res) => {
  const { gameId } = req.body;
  res.json({
    url: `https://scattercasino.pro/demo/${gameId}.html`
  });
});

app.get("/", (req, res) => {
  res.send("✅ Scatter Proxy работает — демо API подключен");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("✅ Scatter Proxy запущен на порту " + PORT));
